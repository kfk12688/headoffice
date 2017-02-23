import React, { PropTypes } from "react";
import { isNil } from "utils";
import cx from "classnames";

const Button = ({ disabled, size, style, outline, block, faName, faClassName, children, isToggled, className, ...rest }) => {
  const styleTag    = isNil(style) ? "secondary" : style;
  const outlineFlag = outline ? "-outline" : "";
  const faIcon      = faName ? <i className={cx(`fa fa-${faName}`, faClassName)}/> : null;

  let defaults = cx("btn", `btn${outlineFlag}-${styleTag}`, "btn-sm");
  if (size === "lg") defaults = cx("btn", `btn${outlineFlag}-${styleTag}`, "btn-lg");
  if (size === "md") defaults = cx("btn", `btn${outlineFlag}-${styleTag}`, "btn-md");
  if (block) defaults = cx(defaults, "btn-block");
  if (disabled) defaults = cx(defaults, "disabled");
  if (isToggled) defaults = cx(defaults, "active");

  return (
    <button type="button"
            className={cx(defaults, className)}
            disabled={disabled}
            {...rest}
    >
      {children ? <span>{children}&nbsp;{faIcon}</span> : faIcon}
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
