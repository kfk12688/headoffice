import React from "react";
import moment from "moment";
import styles from "./common.less";

export const DateCell = ({ value }) => {
  let dateValue = "";
  if (value) {
    if (moment(value, "DD-MM-YY h:mm A", true).isValid()) {
      dateValue = value;
    } else {
      dateValue = moment.utc(value).format("DD-MM-YYYY");
    }
  }

  return (
    <div className={styles.alignLeft}>
      <span>{dateValue}</span>
    </div>
  );
};

DateCell.propTypes = {
  value : React.PropTypes.string.isRequired,
};
