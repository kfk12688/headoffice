/**
 * Created by sharavan on 21/05/16.
 */
import React from "react";
import { SearchBox } from "../index";
import FontAwesome from "react-fontawesome";
import Overlay from "react-overlays/lib/Overlay";
import styles from "./PopupSearchBox.less";

class PopupSearchBox extends React.Component {
  constructor() {
    super();
    this.popupMenuStyle = undefined;
    this.state = {
      hovered   : false,
      showPopup : false,
      width     : "auto",
    };
    this.ctrls = {};
    this.assignTarget = target => this.ctrls.target = target;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.showPopup) {
      this.setState({ showPopup : false });
    } else {
      this.setState({ showPopup : true });
    }
  }

  componentDidMount() {
    if (this.props.matchParentWidth) {
      this.popupMenuStyle = {
        width : this.ctrls.target.getBoundingClientRect().width,
        ...this.props.childrenStyle,
      }
    } else {
      this.popupMenuStyle = { ...this.props.childrenStyle };
    }
  }

  render() {
    return (
      <div
        tabIndex="0"
        ref={this.assignTarget}
        className={styles.base}
        onClick={this.handleClick}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        {this.props.value}
        <FontAwesome
          className={styles.icon}
          name="caret-down"
        />

        <Overlay
          rootClose
          show={this.state.showPopup}
          onHide={() => this.setState({ showPopup: false })}
          placement="bottom"
          target={() => this.ctrls.target}
        >
          <div className={styles.menu} style={this.popupMenuStyle}>
            <SearchBox placeHolder value={this.props.value} onChangeHandler={this.props.onChangeHandler}/>
          </div>
        </Overlay>
      </div>
    );
  }
}

export { PopupSearchBox };
