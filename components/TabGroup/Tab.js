/**
 * Created by sharavan on 12/05/16.
 */
import React from "react";
import cx from "classnames";
import styles from "./Tab.less";

const Tab = ({ style, children, className }) => {
  const classes: any = {};
  classes[className] = !!className;

  return (
    <span
      style={Object.assign({}, { border: 0 }, style)}
      className={cx(styles.hoTab, classes)}
    >
      {children}
    </span>
  );
};

export { Tab };
