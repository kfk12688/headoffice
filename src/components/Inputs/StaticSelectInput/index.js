import React from "react";
import _ from "underscore";

const StaticSelectInput = ({ className, options, input, meta, ...rest }) => {
  const optionNodes = _.map(options, (item, idx) =>
    <option key={idx + 1} value={item}>{item}</option>
  );

  return (
    <select {...rest} {...input} style={{ width : "100%" }} className="custom-select">
      <option key={0} value=""></option>
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
