/**
 * Created by sharavan on 21/05/16.
 */
import React from "react";
import FontAwesome from "react-fontawesome";
import cx from "classnames";
import Overlay from "react-overlays/lib/Overlay";
import styles from "./PopupTextBox.less";

class PopupTextBox extends React.Component {
  constructor() {
    super();
    this.state = { showPopup : false };
    this.ctrls = {};
    this.childrenStyle = null;
    this.popupMenuStyle = undefined;
    this.popupMenuItems = undefined;

    this.assignTarget = this.assignTarget.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePopupMenuClick = this.handlePopupMenuClick.bind(this);
  }

  assignTarget(target) {
    this.ctrls.target = target;
  }

  handleClick() {
    if (this.state.showPopup) {
      this.setState({ showPopup : false });
    } else {
      this.setState({ showPopup : true });
    }
  }

  handlePopupMenuClick(cb, e) {
    this.setState({ showPopup : false });
    if (cb !== undefined) {
      cb(e);
    }
  }

  componentDidMount():void {
    if (this.props.matchParentWidth) {
      this.popupMenuStyle = Object.assign({}, { width : this.ctrls.target.getBoundingClientRect().width }, this.props.childrenStyle);
    } else {
      this.popupMenuStyle = Object.assign({}, this.props.childrenStyle);
    }

    if (this.props.childrenStyle) {
      if (typeof this.props.childrenStyle === "string") {
        this.childrenStyle = this.props.childrenStyle;
      }
    }

    this.popupMenuItems = React.Children.map(this.props.children, (child:React.ReactElement<any>, index:number) => {
      return React.cloneElement(child, {
        className : cx(this.childrenStyle, {
          [styles.menuItem] : !this.props.childrenStyle,
        }),
        key       : index,
        onClick   : this.handlePopupMenuClick.bind(this, child.props.callBack),
      });
    });
  }

  render() {
    return (
      <div
        tabIndex="0"
        ref={this.assignTarget}
        onClick={this.handleClick}
        className={styles.base}
      >
        <span>{this.props.label || "&nbsp;"}</span>
        <FontAwesome className={styles.icon} name="caret-down"/>

        <Overlay
          rootClose
          show={this.state.showPopup}
          onHide={() => this.setState({ showPopup: false })}
          placement="bottom"
          target={() => this.ctrls.target}
        >
          <div className={styles.menu} style={this.popupMenuStyle}>
            {this.popupMenuItems}
          </div>
        </Overlay>
      </div>
    );
  }
}

export { PopupTextBox };
