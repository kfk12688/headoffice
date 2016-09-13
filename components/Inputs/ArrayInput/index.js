import _ from "underscore";
import React, { Component } from "react";
import { Field } from "redux-form";
import { Button, getComponentFromType } from "components";
import styles from "./ArrayInput.less";

const zPad = (string, size) => {
  let retVal = "";
  if (typeof string !== "string") retVal = string.toString();
  while (retVal.length !== size) retVal = `0${retVal}`;
  return retVal;
};

class ArrayInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields : {},
    };

    this.getFields = this.getFields.bind(this);
  }

  getFields() {
    const { fields, subKeys } = this.props;
    const areFieldsPresent = (fields.length !== 0);
    const onClickRemoveHandler = (e, index) => {
      e.preventDefault();
      fields.remove(index);
    };

    if (areFieldsPresent) {
      return fields.map((field, idx) =>
        <div key={idx} className={styles.row}>
          <div className={styles.idx}> {zPad(idx + 1, 2)} </div>
          {_.map(subKeys, (subField, key) => {
            const { title, type, props : { ref, refFieldName } } = subField;
            const renderComponent = getComponentFromType(type, { refId : ref, refFieldName });
            return (
              <div key={key} className={styles.ip}>
                <div>{title}</div>
                <Field name={`${field}.${key}`} {...renderComponent}/>
              </div>
            );
          })}
          <Button accent className={styles.clsBtn} faName="times" onClick={e => onClickRemoveHandler(e, idx)}/>
        </div>
      );
    }

    return null;
  }

  render() {
    const { fields, name, title } = this.props;
    const onClickAddHandler = e => {
      e.preventDefault();
      fields.push({});
    };

    return (
      <div>
        <div className={styles.arrayHeader}>
          <div style={{ float : "left" }}>{`Enter data into ${name} Array`}</div>
          <Button style={{ float : "right" }} bordered onClick={onClickAddHandler}>{`Add ${name}`}</Button>
        </div>

        <div className={styles.arrayFields}>{this.getFields()}</div>
      </div>
    );
  }
}

export { ArrayInput };
