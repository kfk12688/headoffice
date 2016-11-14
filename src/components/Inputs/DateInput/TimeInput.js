import React from "react";
import moment from "moment";
import cx from "classnames";

export const TimeInput = ({ input, meta, ...rest }) => {
  const { onChange, value, ...restInput } = input;
  const parse = val => val && moment.utc(val).format();
  const format = val => val && moment(val).format("HH:mm:ss");

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

TimeInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  meta      : React.PropTypes.object,
};
