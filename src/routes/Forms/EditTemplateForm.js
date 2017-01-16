import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, SelectInput } from "components";

class EditTemplateForm extends Component {
  constructor() {
    super();
    this.onSubmit  = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit();
    this.props.reset();
    this.props.toggleModal();
  }

  resetForm(e) {
    e.preventDefault();
    this.props.toggleModal();
  }

  render() {
    const { pristine, submitting } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Workbook</label>
          <Field
            name="workbook"
            component={SelectInput}
            api={"api/list/workbooks"}
          />
        </div>

        <div className="form-group" style={{ textAlign : "right" }}>
          <Button style="success" disabled={pristine || submitting} type="submit">Save</Button>
          <Button onClick={this.resetForm}>Cancel</Button>
        </div>
      </form>
    );
  }
}

EditTemplateForm.propTypes = {
  // redux-form injected props
  pristine     : React.PropTypes.bool,
  submitting   : React.PropTypes.bool,
  handleSubmit : React.PropTypes.func.isRequired,
  reset        : React.PropTypes.func.isRequired,

  toggleModal : React.PropTypes.func,
};
export default reduxForm({
  form : "editTemplate",
})(EditTemplateForm);
