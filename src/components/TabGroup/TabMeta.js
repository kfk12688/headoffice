/**
 * Created by sharavan on 12/05/16.
 */
import React from "react";
import styles from "./TabMeta.less";

const TabMeta = ({ children, meta, style }) =>
  <span className={styles.hoMetaTab}>
    <span
      className={styles.hoMetaTabButton}
      style={style}
    >
      {children}
    </span>
    <span className={styles.hoMetaTabCount}>{meta.count}</span>
  </span>;

TabMeta.displayName = "TabMeta";

TabMeta.propTypes = {
  children : React.PropTypes.node.isRequired,
  style    : React.PropTypes.object,
  meta     : React.PropTypes.object,
};

export { TabMeta };
