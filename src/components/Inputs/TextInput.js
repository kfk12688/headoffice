import React from "react";

export const TextInput = ({ input, meta, ...rest }) =>
  <input
    {...rest}
    className="form-control"
    type="text"
    {...input}
  />;

TextInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  meta      : React.PropTypes.object,
};
