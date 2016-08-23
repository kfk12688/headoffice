import React from "react";
import FontAwesome from "react-fontawesome";
import Overlay from "react-overlays/lib/Overlay";
import styles from "./ListInput.less";
import cx from "classnames";

class ListInput extends React.Component {
  constructor() {
    super();
    this.popupMenuStyle = undefined;
    this.state = {
      hovered      : false,
      showPopup    : false,
      width        : "auto",
      searchText   : "",
    };
    this.ctrls = {};
    this.assignTarget = target => { this.ctrls.target = target };
    this.handleClick = this.handleClick.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
    this.setSelectedText = this.setSelectedText.bind(this);
    this.populate = this.populate.bind(this);
  }

  componentDidMount() {
    if (this.props.matchParentWidth) {
      this.popupMenuStyle = {
        width : this.ctrls.target.getBoundingClientRect().width,
        ...this.props.childrenStyle,
      };
    } else {
      this.popupMenuStyle = { ...this.props.childrenStyle };
    }
  }

  setSearchText(value) {
    this.setState({ searchText : value });
  }

  setSelectedText(value) {
    const { field } = this.props;
    field.onChange(value);
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
    const { className, field } = this.props;

    const matches = this.populate();

    return (
      <div
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
        {field.value}
        <Overlay
          rootClose
          show={this.state.showPopup}
          onHide={() => this.setState({ showPopup : false })}
          placement="bottom"
          target={() => this.ctrls.target}
        >
          <div className={styles.menu} style={this.popupMenuStyle}>
            <div className={styles.searchBox}>
              <input
                className={styles.searchBoxInput}
                placeholder="Search ..."
                value={this.state.searchText}
                onChange={e => this.setSearchText(e.target.value)}
              />
              <FontAwesome
                className={styles.searchBoxIcon}
                name="search"
              />
            </div>
            {matches.map(elem =>
              <div
                key={elem.key}
                onClick={e => this.setSelectedText(e.target.innerText)}
              >
                {elem.text}
              </div>
            )}
          </div>
        </Overlay>
      </div>
    );
  }
}

ListInput.propTypes = {
  className        : React.PropTypes.string,
  matchParentWidth : React.PropTypes.bool,
  childrenStyle    : React.PropTypes.object,
  field            : React.PropTypes.object.isRequired,
};

export { ListInput };
