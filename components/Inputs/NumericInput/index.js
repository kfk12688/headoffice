import React from "react";
import styles from "./NumericInput.less";

export const NumericInput = ({ className, field }) => {
  const { onChange, value, ...rest } = field;
  const parse = event => Number(event.target.value);

  return (
    <div className={className || styles.numericBox}>
      <input
        type="number"
        className={styles.numericBoxInput}
        onChange={e => onChange(parse(e))}
        value={value}
        {...rest}
      />
    </div>
  );
};

NumericInput.propTypes = {
  className : React.PropTypes.string,
  field : React.PropTypes.object.isRequired,
};
