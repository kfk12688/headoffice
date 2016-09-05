import React from "react";
import { Button } from "./index";
import Overlay from "react-overlays/lib/Overlay";
import styles from "./PopupButton.less";
import cx from "classnames";

class PopupButton extends React.Component {
  constructor() {
    super();
    this.state = { showPopup : false };
    this.ctrls = {};
    this.assignTarget = target => { this.ctrls.target = target; };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { children, childrenStyle } = this.props;

    if (childrenStyle && (typeof childrenStyle === "string")) {
      this.childrenStyle = childrenStyle;
    } else {
      this.popupMenuStyle = childrenStyle;
    }

    this.popupMenuItems = React.Children.map(children, child => React.cloneElement(child, {
      className : cx(this.childrenStyle, {
        [styles.menuItem] : !childrenStyle,
      }),
    }));
  }

  handleClick() {
    this.setState({ showPopup : !this.state.showPopup });
  }

  render() {
    const { label, faName, className, bordered } = this.props;
    let baseClass = styles.base;
    if (bordered) baseClass = cx(styles.base, styles.border, className);

    return (
      <span
        className={baseClass}
        ref={this.assignTarget}
        onClick={this.handleClick}
      >
        <Button className={styles.icon} faName={faName || "caret-down"} after> {label} </Button>

        <Overlay
          rootClose
          placement="bottom"
          show={this.state.showPopup}
          onHide={() => this.setState({ showPopup : false })}
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

PopupButton.propTypes = {
  className     : React.PropTypes.string,
  bordered      : React.PropTypes.bool,
  label         : React.PropTypes.string,
  faName        : React.PropTypes.string,
  children      : React.PropTypes.node.isRequired,
  childrenStyle : React.PropTypes.string,
};
