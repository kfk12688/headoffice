import React from "react";
import _ from "underscore";

const DropdownInput = ({ className, options, input, meta, ...rest }) => {
  const optionNodes = _.map(options, (item, idx) =>
    <option key={idx} value={item}>{item}</option>
  );

  return (
    <select {...rest} {...input} style={{ width : "100%" }} className="custom-select">
      {optionNodes}
    </select>
  );
};

DropdownInput.propTypes = {
  input     : React.PropTypes.shape({
    value    : React.PropTypes.any.isRequired,
    onChange : React.PropTypes.func.isRequired,
  }),
  className : React.PropTypes.string,
  options   : React.PropTypes.array,
};

export { DropdownInput };
