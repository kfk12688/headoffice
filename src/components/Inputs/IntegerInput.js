import React from "react";

export const IntegerInput = ({ input, meta, ...rest }) =>
  <input
    {...rest}
    className="form-control"
    type="number"
    step={1}
    {...input}
  />;

IntegerInput.propTypes = {
  input : React.PropTypes.object.isRequired,
  meta  : React.PropTypes.object,
};
