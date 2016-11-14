import React from "react";
import moment from "moment";
import cx from "classnames";

export const WeekInput = ({ input, meta, ...rest }) => {
  const { onChange, value, ...restInput } = input;
  const parse = val => val && moment.utc(val).format();
  const format = val => val && moment(val).format("YYYY-Www");

  return (
      <input
        type="week"
        className= "form-control"
        onChange={e => onChange(parse(e.target.value))}
        value={format(value)}
        {...restInput}
        {...rest}
      />
  );
};

WeekInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  meta      : React.PropTypes.object,
};
