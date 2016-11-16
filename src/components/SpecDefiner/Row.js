import React from "react";
import { Field } from "redux-form";
import styles from "./common.less";

const Row = ({ prop, component, ...rest }) =>
  <div className="form-group row">
    <label className="col-xs-4 col-form-label">{prop.displayText}</label>
    <div className="col-xs-4">
      <Field name={prop.key} {...rest} component={component}/>
    </div>
  </div>;

Row.propTypes = {
  prop      : React.PropTypes.object,
  component : React.PropTypes.func,
};

export default Row;
