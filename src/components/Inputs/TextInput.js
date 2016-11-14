import React from "react";

export const TextInput = ({ input, meta, ...rest }) =>
  <input
    className="form-control"
    type="text"
    {...input}
    {...rest}
  />;

TextInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  meta      : React.PropTypes.object,
};
