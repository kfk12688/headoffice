import React from "react";

export const NumericInput = ({ input }) => {
  const { onChange, ...rest } = input;
  const parse = val => Number(val);

  return (
    <input
      className="form-control"
      type="number"
      onChange={e => onChange(parse(e.target.value))}
      {...rest}
    />
  );
};

NumericInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
};
