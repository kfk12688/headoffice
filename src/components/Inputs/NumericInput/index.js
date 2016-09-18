import React from "react";
import styles from "./NumericInput.less";

export const NumericInput = ({ className, input }) => {
  const { onChange, ...rest } = input;
  const parse = val => Number(val);

  return (
    <input
      className={className || styles.numericInput}
      type="number"
      onChange={e => onChange(parse(e.target.value))}
      {...rest}
    />
  );
};

NumericInput.propTypes = {
  className : React.PropTypes.string,
  input     : React.PropTypes.object.isRequired,
};
