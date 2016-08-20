import React from "react";
import moment from "moment";
import styles from "./DateInput.less";

export const DateInput = ({ field, className }) => {
  const { onChange, value, ...rest } = field;
  const parse = event => moment.utc(event.target.value);

  return (
    <div className={className || styles.datebox}>
      <input
        type="date"
        className={styles.dateboxInput}
        onChange={e => onChange(parse(e))}
        value={moment(value).isValid() && moment(value).format("YYYY-MM-DD") || ""}
        {...rest}
      />
    </div>
  );
};

DateInput.propTypes = {
  className : React.PropTypes.string,
  field     : React.PropTypes.object.isRequired,
};
