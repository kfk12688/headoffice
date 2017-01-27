import React from "react";
import { Field } from "redux-form";

const Row = ({ name, displayText, component, refCb, ...rest }) =>
  <div className="form-group row">
    <label className="col-xs-4 col-form-label">{displayText}</label>
    <div className="col-xs-4" ref={refCb}>
      <Field name={name} {...rest} component={component}/>
    </div>
  </div>;

Row.propTypes = {
  name        : React.PropTypes.string.isRequired,
  displayText : React.PropTypes.string.isRequired,
  component   : React.PropTypes.func,
  refCb       : React.PropTypes.func,
};

export default Row;
