import React from "react";
import { toTitle, imap, isObject } from "utils";

const StaticSelectInput = ({ className, options, input }) => {
  const getDOM      = (item, idx) => {
    if (isObject(item)) {
      if (item.disabled) return (<option key={idx} value={null} disabled>{item.label}</option>);
      return (<option key={idx} value={item.value}>{toTitle(item.label)}</option>);
    }
    return (<option key={idx} value={item}>{toTitle(item)}</option>);
  };
  const optionNodes = imap(getDOM, options);

  return (
    <select {...input} style={{ width : "100%" }} className="custom-select">
      <option value="" disabled>Select your option</option>
      <option value={null} disabled>──────────</option>
      {optionNodes}
    </select>
  );
};

StaticSelectInput.propTypes = {
  input     : React.PropTypes.shape({
    value    : React.PropTypes.any.isRequired,
    onChange : React.PropTypes.func.isRequired,
  }),
  className : React.PropTypes.string,
  options   : React.PropTypes.array,
};

export { StaticSelectInput };
