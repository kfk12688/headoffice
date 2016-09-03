import React from "react";
import Overlay from "react-overlays/lib/Overlay";
import styles from "./ComboSearchInput.less";
import cx from "classnames";

class ComboSearchInput extends React.Component {
  constructor() {
    super();
    this.popupMenuStyle = undefined;
    this.state = {
      hovered    : false,
      showPopup  : false,
      width      : "auto",
      searchText : "",
    };
    this.ctrls = {};
    this.assignTarget = target => { this.ctrls.target = target };
    this.handleClick = this.handleClick.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
    this.setSelectedText = this.setSelectedText.bind(this);
    this.populate = this.populate.bind(this);
  }

  componentDidMount() {
    this.popupMenuStyle = {
      width : this.ctrls.target.getBoundingClientRect().width,
      ...this.props.childrenStyle,
    };
  }

  setSearchText(value) {
    this.setState({ searchText : value });
  }

  setSelectedText(value) {
    const { input } = this.props;
    input.onChange(value);
  }

  populate() {
    const searchText = this.state.searchText;
    const pattern = new RegExp(searchText, "g");
    const matches = ["adda", "caba", "cada"]
      .map((elem, idx) => ({ key : idx, text : elem }))
      .filter(elem => pattern.test(elem.text));

    return matches;
  }

  handleClick() {
    if (this.state.showPopup) {
      this.setState({ showPopup : false });
    } else {
      this.setState({ showPopup : true });
    }
  }

  render() {
    const { className, input } = this.props;

    const matches = this.populate();

    return (
      <span
        tabIndex="0"
        ref={this.assignTarget}
        className={cx(className, styles.base)}
        onClick={this.handleClick}
        onMouseEnter={() => this.setState({ hovered : true })}
        onMouseLeave={() => this.setState({ hovered : false })}
      >
        <i
          className={cx("fa fa-caret-down", styles.faIcon)}
          title="Click to open"
        />
        {input.value}
        <Overlay
          rootClose
          show={this.state.showPopup}
          onHide={() => this.setState({ showPopup : false })}
          placement="bottom"
          target={() => this.ctrls.target}
        >
          <div className={styles.overlay} style={this.popupMenuStyle}>

            {/* Search Box */}
            <div className={styles.searchBox}>
              <textarea
                rows="1"
                value={this.state.searchText}
                onChange={e => this.setSearchText(e.target.value)}
              />
              <span title="Close (Esc)" onClick={e => this.setSearchText("")}>X</span>
            </div>

            {/* Elements */}
            <div className={styles.items}>
              {matches.map(elem =>
                <div
                  key={elem.key}
                  onClick={e => this.setSelectedText(e.target.innerText)}
                >
                  {elem.text}
                </div>
              )}
            </div>
          </div>
        </Overlay>
      </span>
    );
  }
}

ComboSearchInput.propTypes = {
  className     : React.PropTypes.string,
  childrenStyle : React.PropTypes.object,
  input         : React.PropTypes.object.isRequired,
};

export { ComboSearchInput };
