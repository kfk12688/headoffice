import React from "react";
import styles from "./NumericInput.less";

export const NumericInput = ({ className, field }) => {
  const { onChange, value, ...rest } = field;
  const parse = event => Number(event.target.value);

  return (
    <input
      className={className || styles.numericInput}
      type="number"
      onChange={e => onChange(parse(e))}
      value={value}
      {...rest}
    />
  );
};

NumericInput.propTypes = {
  className : React.PropTypes.string,
  field     : React.PropTypes.object.isRequired,
};
