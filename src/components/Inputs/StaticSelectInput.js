import React from "react";
import { toTitle, imap } from "utils";

const StaticSelectInput = ({ className, options, input, ...rest }) => {
  const getDOM      = (item, idx) => <option key={idx} value={item}>{toTitle(item)}</option>;
  const optionNodes = imap(getDOM, options);

  return (
    <select {...input} {...rest} style={{ width : "100%" }} className="custom-select">
      <option value="" disabled>Select your option</option>
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
