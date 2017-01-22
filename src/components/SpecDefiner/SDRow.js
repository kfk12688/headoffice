import React from "react";
import { Field } from "redux-form";

const Row = ({ prop, component, refCb, ...rest }) =>
  <div className="form-group row">
    <label className="col-xs-4 col-form-label">{prop.displayText}</label>
    <div className="col-xs-4" ref={refCb}>
      <Field name={prop.key} {...rest} component={component}/>
    </div>
  </div>;

Row.propTypes = {
  prop      : React.PropTypes.object,
  component : React.PropTypes.func,
  refCb     : React.PropTypes.func,
};

export default Row;
