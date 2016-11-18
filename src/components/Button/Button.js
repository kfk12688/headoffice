import React, { PropTypes } from "react";
import cx from "classnames";

const Button = ({ disabled, size, style, outline, block, faName, faClassName, children, isToggled, ...rest }) => {
  if (style === undefined) style = "secondary";
  const outlineFlag = outline ? "-outline" : "";
  const faIcon = faName && <i className={cx(`fa fa-${faName}`, faClassName)}/>;

  let className = cx("btn", `btn${outlineFlag}-${style}`, "btn-sm");
  if (size === "lg") className = cx("btn", `btn${outlineFlag}-${style}`, "btn-lg");
  if (size === "md") className = cx("btn", `btn${outlineFlag}-${style}`, "btn-md");
  if (block) className = cx(className, "btn-block");
  if (disabled) className = cx(className, "disabled");
  if (isToggled) className = cx(className, "active");

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      {...rest}
    >
      {children ? <span>{children}{"  "}{faIcon}</span> : faIcon}
    </button>
  );
};

Button.propTypes = {
  className   : PropTypes.string,
  faName      : PropTypes.string,
  faClassName : PropTypes.string,
  children    : PropTypes.any,
  style       : PropTypes.string,
  size        : PropTypes.string,
  outline     : PropTypes.bool,
  block       : PropTypes.bool,
  disabled    : PropTypes.bool,
  isToggled   : PropTypes.bool,
};

export { Button };
