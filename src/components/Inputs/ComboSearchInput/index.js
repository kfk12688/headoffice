import React from "react";
import styles from "./ComboSearchInput.less";
import cx from "classnames";

function initCache() {
  const cache = {};
  return cache;
}

function updateCache(cache, input, data) {
  if (!cache) return;
  cache[input] = data;
}

function getFromCache(cache, input) {
  if (!cache) return;

  for (let i = input.length; i >= 0; --i) {
    const cacheKey = input.slice(0, i);
    if (cache[cacheKey] && (input === cacheKey || cache[cacheKey].complete)) {
      return cache[cacheKey];
    }
  }
}

function thenPromise(promise, callback) {
  if (!promise || typeof promise.then !== "function") return;

  return promise.then(data => {
    callback(null, data);
  }, err => {
    callback(err);
  });
}

class ComboSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup  : false,
      width      : "auto",
      searchText : "",
      options    : [],
      cache      : initCache(),
      isLoading  : false,
    };
    this.ctrls = {};
    this.labels = {};
    this.assignTarget = target => {
      this.ctrls.target = target;
    };
    this.assignInput = input => {
      this.ctrls.input = input;
    };

    this.togglePopup = this.togglePopup.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
    this.setSelectedText = this.setSelectedText.bind(this);

    this.loadOptions = this.loadOptions.bind(this);
    this.getResponseHandler = this.getResponseHandler.bind(this);
    this.focus = this.focus.bind(this);
    this.renderBox = this.renderBox.bind(this);
  }

  componentDidMount() {
    this.popupMenuStyle = {
      width : this.ctrls.target.offsetWidth,
      ...this.props.childrenStyle,
    };
    this.loadOptions("");
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.searchText !== nextState.searchText) this.loadOptions(nextState.searchText);
  }

  getResponseHandler(input) {
    return (err, data) => {
      if (err) throw err;

      updateCache(this.state.cache, input, data);

      this.setState({
        isLoading : false,
        options   : data && data.options || [],
      });
    };
  }

  setSearchText(value) {
    this.setState({ searchText : value });
  }

  setSelectedText(value) {
    const { input } = this.props;
    this.labels[value.id] = value.label;
    input.onChange(value.id);
    this.setState({ showPopup : false, searchText : "" });
  }

  focus() {
    this.ctrls.target.focus();
  }

  loadOptions(input) {
    const loadOptionsApi = this.props.loadOptions;

    const cacheResult = getFromCache(this.state.cache, input);
    if (cacheResult) {
      return this.setState({
        options : cacheResult.options,
      });
    }
    this.setState({
      isLoading : true,
    });
    const responseHandler = this.getResponseHandler(input);
    const inputPromise = thenPromise(loadOptionsApi(input), responseHandler);
    return inputPromise ? inputPromise.then(() => input) : input;
  }

  togglePopup() {
    if (this.state.showPopup) {
      this.setState({ showPopup : false, searchText : "" });
    } else {
      this.setState({ showPopup : true });
    }
  }

  renderBox() {
    if (this.state.showPopup) {
      return (
        <div className={styles.box}>

          {/* Search Box */}
          <div className={styles.searchBox}>
            <textarea
              rows="1"
              ref={this.assignInput}
              value={this.state.searchText}
              onChange={e => this.setSearchText(e.target.value)}
            />
            <span title="Close (Esc)" onClick={() => this.setSearchText("")}>X</span>
          </div>

          {/* Elements */}
          <div className={styles.items} style={this.popupMenuStyle}>
            {
              this.state.options.map(elem =>
                <div
                  key={elem.id}
                  data-id={elem.id}
                  onClick={e => this.setSelectedText({ id : elem.id, label : e.target.innerText })}
                >
                  {elem.label}
                </div>
              )
            }
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    const { className, input } = this.props;

    return (
      <div className={className}>
        <div
          tabIndex="0"
          ref={this.assignTarget}
          className={styles.input}
          onClick={this.togglePopup}
        >
          <i className={cx("fa fa-caret-down", styles.faIcon)} title="Click to open"/>
          <span>{this.labels[input.value]}</span>
        </div>
        {this.renderBox()}
      </div>
    );
  }
}

ComboSearchInput.propTypes = {
  className     : React.PropTypes.string,
  childrenStyle : React.PropTypes.object,
  loadOptions   : React.PropTypes.func,
  input         : React.PropTypes.object.isRequired,
};

export { ComboSearchInput };
