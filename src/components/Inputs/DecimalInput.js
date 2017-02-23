import React from "react";

export const DecimalInput = ({ input, meta, ...rest }) =>
  <input
    {...rest}
    className="form-control"
    type="number"
    step={0.01}
    {...input}
  />;

DecimalInput.propTypes = {
  input : React.PropTypes.object.isRequired,
  meta  : React.PropTypes.object,
};
