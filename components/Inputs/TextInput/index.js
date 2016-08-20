import React from "react";
import styles from "./TextInput.less";

export const TextInput = ({ className, field }) =>
  <div className={className || styles.textbox}>
    <input
      type="text"
      className={styles.textboxInput}
      {...field}
    />
  </div>;

TextInput.propTypes = {
  field     : React.PropTypes.object.isRequired,
  className : React.PropTypes.string,
};
