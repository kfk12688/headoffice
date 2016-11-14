import React from "react";
import cx from "classnames";

const CheckBoxInput = ({ input, children, inline, disabled }) => {
  const { value, ...restInput } = input;

  const renderChildren = (children) => {
    if (children) return <span>&nbsp;&nbsp;{children}</span>;
    return null;
  }

  const renderInlineElements = () =>
    <label className={cx("form-check-inline",{"disabled" : disabled})}>
      <input
        className="form-check-input"
        type="checkbox"
        checked={value || false}
        disabled={disabled}
        {...restInput}
      />
      {renderChildren(children)}
    </label>;
  
  const renderStackedElements = () =>
    <div className={cx("form-check",{"disabled" : disabled})}>
      <label className="form-check-label">
        <input
          className="form-check-input"
          type="checkbox"
          checked={value || false}
          disabled={disabled}
          {...restInput}
        />
        {renderChildren(children)}
      </label>
    </div>;

  if (inline) return renderInlineElements();
  return renderStackedElements();
};

CheckBoxInput.propTypes = {
  input     : React.PropTypes.object.isRequired,
  className : React.PropTypes.string,
  children  : React.PropTypes.node,
};

export { CheckBoxInput };
