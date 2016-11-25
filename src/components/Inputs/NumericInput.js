import React from "react";

export const NumericInput = ({ input, meta, ...rest }) =>
  <input
    {...rest}
    className="form-control"
    type="number"
    step="any"
    {...input}
  />;

NumericInput.propTypes = {
  input : React.PropTypes.object.isRequired,
  meta  : React.PropTypes.object,
};
