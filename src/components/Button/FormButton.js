/**
 * Created by sharavan on 12/05/16.
 */
import React, { PropTypes } from "react";
import cx from "classnames";
import styles from "./FormButton.less";

const FormButton = ({ style, className, faName, faClassName, onClick, after, accent, type, children, disabled }) => {
  const faIcon = faName && <i className={cx(`fa fa-${faName}`, faClassName)}/>;

  let accentBtnStyle = styles.button;
  if (accent === "green") {
    accentBtnStyle = styles.buttonWithGreenAccent;
  } else if (accent) {
    accentBtnStyle = styles.buttonWithAccent;
  }
  if ((disabled !== undefined) && disabled) {
    accentBtnStyle = styles.disabledButton;
  }

  if (after) {
    return (
      <button
        className={cx(accentBtnStyle, className)}
        style={style}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
        {" "}
        {faIcon}
      </button>
    );
  }

  return (
    <button
      className={cx(accentBtnStyle, className)}
      style={style}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {faIcon}
      {" "}
      {children}
    </button>
  );
};

FormButton.displayName = "FormButton";
FormButton.propTypes = {
  style       : PropTypes.object,
  className   : PropTypes.string,
  type        : PropTypes.string,       // specifies the button type
  faName      : PropTypes.string,
  faClassName : PropTypes.string,
  children    : PropTypes.string,
  onClick     : PropTypes.func,
  after       : PropTypes.bool,
  accent      : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.boolean,
  ]),
  disabled    : PropTypes.bool,
};

export { FormButton };
