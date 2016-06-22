/**
 * Created by sharavan on 12/05/16.
 */
import React, { PropTypes } from "react";
import FontAwesome from "react-fontawesome";
import cx from "classnames";
import styles from "./FormButton.less";

const FormButton = ({ style, className, faName, faClassName, onClick, after, accent }) => {
  const faIcon = faName && <FontAwesome name={faName} className={faClassName}></FontAwesome>;

  if (after) {
    return (
      <button style={style}
              className={cx({ [styles.hoFormButtonWithAccent]: accent, [styles.hoFormButton]: !accent }, className)}
              onClick={onClick}
      >
        {props.children}
        {" "}
        {faIcon}
      </button>
    );
  } else {
    return (
      <button style={style}
              className={cx({ [styles.hoFormButtonWithAccent]: accent, [styles.hoFormButton]: !accent }, className)}
              onClick={onClick}
      >
        {faIcon}
        {" "}
        {props.children}
      </button>
    );
  }
};

FormButton.displayName = "FormButton";
FormButton.PropTypes = {
  style       : PropTypes.object,
  className   : PropTypes.string,
  faName      : PropTypes.string,
  faClassName : PropTypes.string,
  children    : PropTypes.element,
  onClick     : PropTypes.func,
  after       : PropTypes.boolean,
  accent      : PropTypes.boolean,
};

export { FormButton };
