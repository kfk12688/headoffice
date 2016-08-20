/**
 * Created by sharavan on 12/05/16.
 */
import React, { PropTypes } from "react";
import FontAwesome from "react-fontawesome";
import cx from "classnames";
import styles from "./FormButton.less";

const FormButton = ({ style, className, faName, faClassName, onClick, after, accent, type, children }) => {
  const faIcon = faName && <FontAwesome name={faName} className={faClassName}/>;

  let accentBtnStyle = styles.button;
  if (accent === "green") {
    accentBtnStyle = styles.buttonWithGreenAccent;
  } else if (accent) {
    accentBtnStyle = styles.buttonWithAccent;
  }

  if (after) {
    return (
      <button
        className={cx(accentBtnStyle, className)}
        style={style}
        onClick={onClick}
        type={type}
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
  children    : PropTypes.element,
  onClick     : PropTypes.func,
  after       : PropTypes.boolean,
  accent      : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.boolean,
  ]),
};

export { FormButton };
