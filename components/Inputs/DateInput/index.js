import React from "react";
import moment from "moment";
import styles from "./DateInput.less";

export const DateInput = ({ input, className }) => {
  const { onChange, value, ...rest } = input;
  const parse = event => moment.utc(event.target.value).format();

  return (
    <div className={className || styles.datebox}>
      <input
        type="date"
        className={styles.input}
        onChange={e => onChange(parse(e))}
        value={(value && moment(value).isValid()) ? moment(value).format("YYYY-MM-DD") : ""}
        {...rest}
      />
    </div>
  );
};

DateInput.propTypes = {
  className : React.PropTypes.string,
  input     : React.PropTypes.object.isRequired,
};
