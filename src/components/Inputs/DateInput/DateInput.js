import React from "react";
import moment from "moment";

export const DateInput = ({ input, meta, ...rest }) => {
  const { onChange, value } = input;
  const parse               = val => val && moment.utc(val).local().format();
  const format              = val => val && moment(val).local().format("YYYY-MM-DD");

  return (
    <input type="date"
           className="form-control"
           onChange={e => onChange(parse(e.target.value))}
           value={format(value)}
           {...rest}
    />
  );
};

DateInput.propTypes = {
  input : React.PropTypes.object.isRequired,
  meta  : React.PropTypes.object,
};
