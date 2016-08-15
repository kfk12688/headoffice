import React from "react";
import moment from "moment";
import styles from "./common.less";

export const DateCell = ({ value }) =>
  <div className={styles.alignLeft}>
    <span>{moment(value).format("DD-MM-YYYY")}</span>
    {!value && <span>null</span>}
  </div>;

DateCell.propTypes = {
  value : React.PropTypes.string.isRequired,
};
