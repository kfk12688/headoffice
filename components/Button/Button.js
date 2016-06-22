/**
 * Created by sharavan on 12/05/16.
 */
import React, { PropTypes } from "react";
import FontAwesome from "react-fontawesome";
import cx from "classnames";
import styles from "./Button.less";

const Button = ({ style, className, faName, faClassName, onClick, after, children }) => {
  const faIcon = faName && <FontAwesome name={faName} className={faClassName}/>;

  if (after) {
    return (
      <button style={style} className={cx(styles.hoButton, className)} onClick={onClick}>
        {children}
        {" "}
        {faIcon}
      </button>
    );
  } else {
    return (
      <button style={style} className={cx(styles.hoButton, className)} onClick={onClick}>
        {faIcon}
        {" "}
        {children}
      </button>
    );
  }
};

Button.displayName = "Button";
Button.propTypes = {
  style       : PropTypes.object,
  className   : PropTypes.string,
  faName      : PropTypes.string,
  faClassName : PropTypes.string,
  onClick     : PropTypes.func,
};

export { Button };
