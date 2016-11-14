import React from "react";
import moment from "moment";
import cx from "classnames";

export const MonthInput = ({ input, meta, ...rest }) => {
  const { onChange, value, ...restInput } = input;
  const parse = val => val && moment.utc(val).format();
  const format = val => val && moment(val).format("YYYY-MM");

  return (
      <input
        type="month"
        className= "form-control"
        onChange={e => onChange(parse(e.target.value))}
        value={format(value)}
        {...restInput}
        {...rest}
      />
  );
};

MonthInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  meta      : React.PropTypes.object,
};
