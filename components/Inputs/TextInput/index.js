import React from "react";
import styles from "./TextInput.less";

export const TextInput = (props) => {
  const { className, ...rest } = props;

  return (
    <input
      className={className || styles.twextboxInput}
      type="text"
      {...rest}
    />
  );
}

TextInput.propTypes = {
  field     : React.PropTypes.object.isRequired,
  className : React.PropTypes.string,
};
