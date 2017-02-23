import React from "react";
import moment from "moment";

export const TimeStampInput = ({ input, meta, ...rest }) => {
  const { onChange, value } = input;
  const parse               = val => val && moment(val, "HH:mm").format();
  const format              = val => val && moment(val).format("HH:mm");

  return (
    <input type="time"
           className="form-control"
           onChange={e => onChange(parse(e.target.value))}
           value={format(value)}
           {...rest}
    />
  );
};

TimeStampInput.propTypes = {
  input : React.PropTypes.object.isRequired,
  meta  : React.PropTypes.object,
};
