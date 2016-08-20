import React from "react";
import FontAwesome from "react-fontawesome";
import Overlay from "react-overlays/lib/Overlay";
import styles from "./ListInput.less";

class ListInput extends React.Component {
  constructor() {
    super();
    this.popupMenuStyle = undefined;
    this.state = {
      hovered   : false,
      showPopup : false,
      width     : "auto",
      searchTxt : "",
    };
    this.ctrls = {};
    this.assignTarget = target => { this.ctrls.target = target };
    this.handleClick = this.handleClick.bind(this);
    this.setValue = this.setValue.bind(this);
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

  setValue(value) {
    this.setState({ searchTxt : value });
  }

  populate() {
    const searchTxt = this.state.searchTxt;
    const pattern = new RegExp(searchTxt, "g");
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
    const matches = this.populate();

    return (
      <div
        tabIndex="0"
        ref={this.assignTarget}
        className={styles.base}
        onClick={this.handleClick}
        onMouseEnter={() => this.setState({ hovered : true })}
        onMouseLeave={() => this.setState({ hovered : false })}
      >
        {this.state.searchTxt}
        <FontAwesome
          className={styles.icon}
          name="caret-down"
        />

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
                value={this.state.searchTxt}
                onChange={e => this.setValue(e.target.value)}
              />
              <FontAwesome
                className={styles.searchBoxIcon}
                name="search"
              />
            </div>
            {matches.map(elem =>
              <div
                key={elem.key}
                onClick={e => this.setValue(e.target.innerText)}
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
  matchParentWidth : React.PropTypes.bool,
  childrenStyle    : React.PropTypes.object,
  field            : React.PropTypes.object.isRequired,
};

export { ListInput };
