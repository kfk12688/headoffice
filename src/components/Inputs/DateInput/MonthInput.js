import React from "react";
import moment from "moment";

export const MonthInput = ({ input, meta, ...rest }) => {
  const { onChange, value } = input;
  const parse               = val => val && moment(val).format();
  const format              = val => val && moment(val).format("YYYY-MM");

  return (
    <input
      type="month"
      className="form-control"
      onChange={e => onChange(parse(e.target.value))}
      value={format(value)}
      {...rest}
    />
  );
};

MonthInput.propTypes = {
  input : React.PropTypes.object.isRequired,
  meta  : React.PropTypes.object,
};
