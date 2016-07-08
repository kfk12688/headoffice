/**
 * Created by sharavan on 16/05/16.
 */
import React from "react";
import cx from "classnames";
import styles from "./Divider.less";

function getStyles({ vertical, size }) {
  let dynSetting:any = vertical ?
  {
    display       : "inline-block",
    height        : size.h,
    margin        : 0,
    verticalAlign : "top",
    width         : size.w,
  } :
  {
    height : size,
    margin : 0,
    width  : "100%",
  };
  return Object.assign({}, dynSetting);
}

const Divider = ({ style, vertical, size, className }) => {
  const dividerStyle = Object.assign({}, getStyles({ vertical, size }), style);

  if (vertical) {
    return <span className={cx(styles.hoDivider, className)} style={dividerStyle} />;
  } else {
    return <hr className={cx(styles.hoDivider, className)} style={dividerStyle} />;
  }
};

Divider.displayName = "Divider";
Divider.defaultProps = {
  fullSpan : false,
  size     : 1,
  vertical : false,
};

export { Divider };
