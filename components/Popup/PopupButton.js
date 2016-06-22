/**
 * Created by sharavan on 21/05/16.
 */
import React from "react";
import { Button } from "../Button/index";
import cx from "classnames";
import Overlay from "react-overlays/lib/Overlay";
import styles from "./PopupButton.less";

class PopupButton extends React.Component {
  constructor() {
    super();
    this.state = {
      hovered   : false,
      showPopup : false,
    };
    this.ctrls = {};
    this.childrenStyle = undefined;
    this.popupMenuStyle = undefined;
    this.popupMenuItems = undefined;
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
    if (this.props.childrenStyle) {
      if (typeof this.props.childrenStyle === "string") {
        this.childrenStyle = this.props.childrenStyle;
      }
    } else {
      this.popupMenuStyle = Object.assign({}, this.props.childrenStyle);
    }

    this.popupMenuItems = React.Children.map(this.props.children, (child:React.ReactElement<any>) => {
      return React.cloneElement(child, {
        className : cx(this.childrenStyle, {
          [styles.menuItem] : !this.props.childrenStyle,
        }),
      });
    });
  }

  render() {
    return (
      <span
        tabIndex="0"
        ref={this.assignTarget}
        className={styles.base}
        onClick={this.handleClick}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <Button className={styles.icon} faName="caret-down" after> {this.props.label} </Button>

        <Overlay
          rootClose
          show={this.state.showPopup}
          onHide={() => this.setState({ showPopup: false })}
          placement="bottom"
          target={() => this.ctrls.target}
        >
          <div className={styles.menu}>
            {this.popupMenuItems}
          </div>
        </Overlay>
      </span>
    );
  }
}

export { PopupButton };
