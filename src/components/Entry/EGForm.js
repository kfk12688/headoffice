import _ from "underscore";
import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { getComponentFromType, Button } from "components";
import styles from "./EGForm.less";

class EGForm extends Component {
  constructor(props) {
    super(props);
    this.subFields = [];
    this.ctrls = {};
    this.assignFieldTarget = target => this.ctrls.fieldDOM = target;

    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.constructFields = this.constructFields.bind(this);
    this.constructSubFields = this.constructSubFields.bind(this);
  }

  constructFields(fieldProps) {
    const fields = [];
    _.forEach(fieldProps, (field, key) => {
      const { title, type, sub, props } = field;
      const renderComponent = getComponentFromType(type, props);
      const name = key;

      if (sub) return;
      fields.push(
        <div key={name} className={styles.fieldsRow}>
          <div className={styles.title}>
            {title}
            {props.required && <bold><sup>*</sup></bold>}
            {props.unique && <bold><sup>u</sup></bold>}
          </div>
          <Field className={styles.box} name={name} {...renderComponent}/>
        </div>
      );
    });

    return fields;
  }

  constructSubFields(fieldProps) {
    const fields = [];
    _.forEach(fieldProps, (field, key) => {
      const { title, type, sub, props } = field;
      const renderComponent = getComponentFromType(type, props);
      const name = key;

      if (sub) {
        fields.push(
          <div key={name} className={styles.fieldsRowArray}>
            <FieldArray name={name} subKeys={sub}
                        title={title} {...renderComponent}
                        fieldsDOM={this.ctrls.fieldDOM}
            />
          </div>
        );
      }
    });

    return fields;
  }

  resetForm(e) {
    e.preventDefault();
    this.props.reset();
  }

  submitForm(e) {
    e.preventDefault();

    const { handleSubmit } = this.props;
    handleSubmit();

    this.props.reset();
  }

  render() {
    const { className, fieldProps } = this.props;
    const fields = this.constructFields(fieldProps);
    const subFields = this.constructSubFields(fieldProps);

    return (
      <form className={className} onSubmit={this.submitForm}>
        <div ref={this.assignFieldTarget} className={styles.fields}>{fields}</div>
        {(subFields.length !== 0) && <div className={styles.subFields}>{subFields}</div>}
        <div className={styles.formSubmitGroup}>
          <Button className={styles.formSubmitGroupBtn} accent type="submit">Save Data</Button>
          <Button className={styles.formSubmitGroupBtn} bordered onClick={this.resetForm}>Cancel</Button>
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
};

export default reduxForm({
  form : "EGForm",
})(EGForm);
