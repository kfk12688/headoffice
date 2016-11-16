import React from "react";
import cx from "classnames";

const CheckBoxInput = ({ input, children, inline, disabled }) => {
  const { value, ...restInput } = input;

  const renderChildren = (children) => {
    if (children) return <span>&nbsp;&nbsp;{children}</span>;
    return null;
  }

  const renderInlineElements = () =>
    <div className={cx("form-check-inline",{"disabled" : disabled})}>
    <label className="custom-control custom-checkbox">
      <input
        className="custom-control-input"
        type="checkbox"
        checked={value || false}
        disabled={disabled}
        {...restInput}
      />
      <span className="custom-control-indicator"/>
      <span className="custom-control-description">{renderChildren(children)}</span>
    </label>
    </div>;
  
  const renderStackedElements = () =>
    <label className="custom-control custom-checkbox">
      <input
        className="custom-control-input"
        type="checkbox"
        checked={value || false}
        disabled={disabled}
        {...restInput}
      />
      <span className="custom-control-indicator"/>
      <span className="custom-control-description">{renderChildren(children)}</span>
    </label>

  if (inline) return renderInlineElements();
  return renderStackedElements();
};

CheckBoxInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  children  : React.PropTypes.node,
  inline    : React.PropTypes.bool,
  disabled  : React.PropTypes.bool,
};

export { CheckBoxInput };
