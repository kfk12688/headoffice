/**
 * Created by sharavan on 13/09/16.
 */
import React from "react";
import { Field } from "redux-form";
import styles from "./common.less";

const FieldSchemaRow = ({ prop, component, ...rest }) =>
  <div style={{ marginBottom : 3 }}>
    <span className={styles.key}>{prop.displayText}</span>
    <Field name={prop.key} className={styles.field} {...rest} component={component}/>
  </div>;

FieldSchemaRow.propTypes = {
  prop      : React.PropTypes.object,
  component : React.PropTypes.func,
};

export default FieldSchemaRow;
