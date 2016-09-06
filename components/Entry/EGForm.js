import _ from "underscore";
import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { getComponentFromType, Button } from "components";
import styles from "./EGForm.less";

class EGForm extends Component {
  constructor(props) {
    super(props);
    this.subFields = [];

    this.resetForm = this.resetForm.bind(this);
    this.constructFields = this.constructFields.bind(this);
    this.constructSubFields = this.constructSubFields.bind(this);
  }

  constructFields(fieldProps) {
    const fields = _.map(fieldProps, (field, key) => {
      const { title, type, sub } = field;
      const renderComponent = getComponentFromType(type);
      const name = key;

      if (sub) return null;
      return (
        <div key={name} className={styles.fieldsRow}>
          <div className={styles.title}>{title} </div>
          <Field className={styles.box} name={name} {...renderComponent}/>
        </div>
      );
    });

    return fields;
  }

  constructSubFields(fieldProps) {
    const fields = _.map(fieldProps, (field, key) => {
      const { title, type, sub } = field;
      const renderComponent = getComponentFromType(type);
      const name = key;

      if (sub) {
        return (
          <div key={name} className={styles.fieldsRowArray}>
            <FieldArray name={name} subKeys={sub}
                        title={title} {...renderComponent}
            />
          </div>
        );
      }

      return null;
    });

    return fields;
  }

  resetForm(e) {
    e.preventDefault();
    this.props.reset();
  }

  render() {
    const { className, handleSubmit, fieldProps } = this.props;
    const fields = this.constructFields(fieldProps);
    const subFields = this.constructSubFields(fieldProps);

    return (
      <form className={className} onSubmit={handleSubmit}>
        <div className={styles.fields}>{fields}</div>
        <div className={styles.subFields}>{subFields}</div>
        <div className={styles.formSubmitGroup}>
          <Button className={styles.formSubmitGroupBtn} accent type="submit">Save</Button>
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
