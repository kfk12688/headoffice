/**
 * Created by sharavan on 12/05/16.
 */
import React from "react";
import cx from "classnames";
import styles from "./Tab.less";

const Tab = ({ style, children, className }) => {
  const classExists = !!className;

  return (
    <span
      style={{ border : 0, ...style }}
      className={cx(styles.base, { [className] : classExists })}
    >
      {children}
    </span>
  );
};

Tab.propTypes = {
  children  : React.PropTypes.node.isRequired,
  style     : React.PropTypes.object,
  className : React.PropTypes.string,
};

export { Tab };
