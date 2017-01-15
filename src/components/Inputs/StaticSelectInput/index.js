import React from "react";
import R from "ramda";

const StaticSelectInput = ({ className, options, input, ...rest }) => {
  const getDOM      = (item, idx) => <option key={idx} value={item}>{item}</option>;
  const optionNodes = R.compose(R.values, R.mapObjIndexed(getDOM))(options);

  return (
    <select {...rest} {...input} style={{ width : "100%" }} className="custom-select">
      <option value="" disabled selected>Select your option</option>
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
