/**
 * Created by sharavan on 12/05/16.
 */
import React, { PropTypes } from "react";
import styles from "./Button.less";
import cx from "classnames";

const Button = ({ className, faName, faClassName, after, accent, children, bordered, ...rest }) => {
  const faIcon = faName && <i className={cx(`fa fa-${faName}`, faClassName)}/>;

  let style = styles.button;
  if (bordered) style = cx(styles.button, styles.bordered);
  if (accent) style = styles.buttonBrdRed;
  if (accent === "green") style = styles.buttonBrdGreen;
  if (accent === "indigo") style = styles.buttonBrdIndigo;

  if (after) {
    return (
      <button
        className={cx(style, className)}
        type="button"
        {...rest}
      >
        {children}
        {" "}
        {faIcon}
      </button>
    );
  }

  return (
    <button
      className={cx(style, className)}
      type="button"
      {...rest}
    >
      {faIcon}
      {" "}
      {children}
    </button>
  );
};

Button.propTypes = {
  className   : PropTypes.string,
  faName      : PropTypes.string,
  faClassName : PropTypes.string,
  children    : PropTypes.any,
  after       : PropTypes.bool,
  accent      : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.boolean,
  ]),
  bordered    : PropTypes.bool,
};

export { Button };
