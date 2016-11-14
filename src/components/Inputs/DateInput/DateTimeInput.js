import React from "react";

export const DateTimeInput = ({ input, meta, ...rest }) =>
  <input
    type="datetime-local"
    className= "form-control"
    {...rest}
  />;

DateTimeInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  meta      : React.PropTypes.object,
};
