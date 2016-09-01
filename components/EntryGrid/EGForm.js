import _ from "underscore";
import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Button, TextInput, NumericInput, DateInput } from "components";
import styles from "./EGForm.less";

const zPad = (string, size) => {
  let retVal = "";
  if (typeof string !== "string") retVal = string.toString();
  while (retVal.length !== size) retVal = `0${retVal}`;
  return retVal;
};

class EGForm extends Component {
  constructor(props) {
    super(props);

    this.resetForm = this.resetForm.bind(this);
    this.constructFields = this.constructFields.bind(this);

    this.renderFieldArray = this.renderFieldArray.bind(this);
  }

  getComponent(type) {
    if (type === "Date") return DateInput;
    if (type === "Number") return NumericInput;
    if (type === "SchemaArray") return this.renderFieldArray;
    return TextInput;
  }

  constructFields(fieldProps) {
    const fields = _.map(fieldProps, (field, key) => {
      const { title, type, sub } = field;
      const component = this.getComponent(type);
      const name = key;

      if (sub) {
        return (
          <div key={name}>
            <span className={styles.inputTitle}>{title} </span>
            <FieldArray
              className={styles.inputField}
              name={name}
              component={component}
              subKeys={sub}
            />
          </div>
        );
      }

      return (
        <div key={name}>
          <span className={styles.inputTitle}>{title} </span>
          <Field
            className={styles.inputField}
            name={name}
            component={component}
          />
        </div>
      );
    });

    return fields;
  }

  resetForm(e) {
    e.preventDefault();
    this.props.reset();
  }

  renderFieldArray(props) {
    const { fields, name, subKeys } = props;
    const onClickAddHandler = e => {
      e.preventDefault();
      fields.push({});
    };
    const onClickRemoveHandler = (e, index) => {
      e.preventDefault();
      fields.remove(index);
    };
    const areFieldsPresent = (fields.length !== 0);
    const subFields = () => fields.map((field, idx) =>
      <div key={idx}>
        <span> {zPad(idx + 1, 2)} </span>
        {_.map(subKeys, (subField, key) => {
          const { title, type } = subField;
          const component = this.getComponent(type);
          return (
            <span key={key}>
              <span>{title} </span>
              <Field
                className={styles.inputField}
                name={`${field}.${key}`}
                component={component}
              />
            </span>
          );
        })}
        <Button accent className={styles.clsBtn} faName="times" onClick={e => onClickRemoveHandler(e, idx)}/>
      </div>
    );

    return (
      <span>
        <Button accent="indigo" className={styles.addBtn} title={`Click to add data to ${name}`}
                onClick={onClickAddHandler}
        >
          Add Data
        </Button>
        {
          areFieldsPresent &&
          <div className={styles.sub}>
            <div className={styles.fieldCounter}>{`${fields.length} Fields`}</div>
            {subFields()}
          </div>
        }
      </span>
    );
  }

  render() {
    const { editorState, className, handleSubmit, fieldProps } = this.props;
    const fields = this.constructFields(fieldProps);

    return (
      <form className={className} onSubmit={handleSubmit}>
        {fields}
        <div className={styles.formSubmitGroup}>
          <Button accent type="submit">{editorState ? "Add" : "Edit"}</Button>
          <Button onClick={this.resetForm}>Cancel</Button>
        </div>
      </form>
    );
  }
}

EGForm.propTypes = {
  className    : React.PropTypes.string,
  fieldProps   : React.PropTypes.object.isRequired,
  cols         : React.PropTypes.array.isRequired,
  handleSubmit : React.PropTypes.func,
  reset        : React.PropTypes.func,
  editorState  : React.PropTypes.bool,             // indicates the state of the form - whether edit/addition
};

export default reduxForm({
  form : "EGForm",
})(EGForm);
