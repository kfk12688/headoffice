/**
 * Created by sharavan on 15/05/16.
 */
import React from "react";
import cx from "classnames";
import styles from "./Breadcrumb.less";

const Breadcrumb = (props) =>
  <div
    className={cx(styles.base, props.className)}
  />;

export { Breadcrumb };
