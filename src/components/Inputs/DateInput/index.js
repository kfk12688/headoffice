import React from "react";
import moment from "moment";
import styles from "./DateInput.less";
import cx from "classnames";

export const DateInput = ({ input, className, meta, ...rest }) => {
  const { onChange, value, ...restInput } = input;
  const parse = val => val && moment.utc(val).format();
  const format = val => val && moment(val).format("YYYY-MM-DD");

  return (
    <div className={cx(className, styles.datebox)}>
      <input
        type="date"
        className={styles.input}
        onChange={e => onChange(parse(e.target.value))}
        value={format(value)}
        {...restInput}
        {...rest}
      />
    </div>
  );
};

DateInput.propTypes = {
  className : React.PropTypes.string,
  input     : React.PropTypes.object.isRequired,
  meta      : React.PropTypes.object,
};
