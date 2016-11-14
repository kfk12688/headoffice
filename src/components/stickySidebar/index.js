import React from "react";
import cx from "classnames";
import styles from "./index.less";

class StickySidebar extends React.Component {
  render() {
    let { width, top, bottom, right, left, children, className } = this.props;

    let topSetting = top && !bottom ? top : "auto";
    const bottomSetting = !top && bottom ? bottom : "auto";

    if (topSetting === "auto" && bottomSetting === "auto") {
      topSetting = top;
    }

    let rightSetting = right && !left ? right : "auto";
    const leftSetting = !right && left ? left : "auto";

    if (rightSetting === "auto" && leftSetting === "auto") {
      rightSetting = right;
    }

    const parentStyle = {
      width,
      top    : topSetting,
      bottom : bottomSetting,
      right  : rightSetting,
      left   : leftSetting,
    };

    return (
      <div style={parentStyle} className={cx(className, { [styles.placeHolder] : false })}>
        <div ref="sticky">
          {children}
        </div>
      </div>
    );
  }
}

StickySidebar.propTypes = {
  className : React.PropTypes.object,
  width     : React.PropTypes.number.isRequired,
  top       : React.PropTypes.number.isRequired,
  right     : React.PropTypes.number.isRequired,
};

export { StickySidebar };
