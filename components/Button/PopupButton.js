import React from "react";
import { Button } from "./index";
import Overlay from "react-overlays/lib/Overlay";
import styles from "./PopupButton.less";
import cx from "classnames";

class PopupButton extends React.Component {
  constructor() {
    super();
    this.state = {
      hovered   : false,
      showPopup : false,
    };
    this.ctrls = {};
    this.childrenStyle = null;
    this.popupMenuStyle = null;
    this.popupMenuItems = null;
    this.assignTarget = target => { this.ctrls.target = target };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { children, childrenStyle } = this.props;

    if (childrenStyle) {
      if (typeof childrenStyle === "string") {
        this.childrenStyle = childrenStyle;
      }
    } else {
      this.popupMenuStyle = Object.assign({}, childrenStyle);
    }

    this.popupMenuItems = React.Children.map(children, (child: React.ReactElement<any>) => {
      return React.cloneElement(child, {
        className : cx(this.childrenStyle, {
          [styles.menuItem] : !childrenStyle,
        }),
      });
    });
  }

  handleClick() {
    if (this.state.showPopup) {
      this.setState({ showPopup : false });
    } else {
      this.setState({ showPopup : true });
    }
  }

  render() {
    const { label, faName, className, bordered } = this.props;
    let baseClass = styles.base;
    if ((bordered !== undefined) && bordered) {
      baseClass = cx(styles.base, styles.border, className);
    }

    return (
      <span
        ref={this.assignTarget}
        className={baseClass}
        onClick={this.handleClick}
        onMouseEnter={() => this.setState({ hovered : true })}
        onMouseLeave={() => this.setState({ hovered : false })}
      >
        <Button className={styles.icon} faName={faName || "caret-down"} after> {label} </Button>

        <Overlay
          rootClose
          show={this.state.showPopup}
          onHide={() => this.setState({ showPopup : false })}
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

PopupButton.propTypes = {
  className     : React.PropTypes.string,
  bordered      : React.PropTypes.bool,
  label         : React.PropTypes.string,
  faName        : React.PropTypes.string,
  children      : React.PropTypes.node.isRequired,
  childrenStyle : React.PropTypes.string,
};
