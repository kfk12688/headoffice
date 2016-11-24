import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, TextInput } from "components";

class EditCollectionRowForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
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
    const { pristine, submitting, fields } = this.props;

    const btnToolbar = {
      textAlign : "center",
    };

    return (
      <form onSubmit={this.onSubmit}>
        {
          fields.map(field =>
            <div className="form-group row">
              <label className="offset-md-1 col-md-3">{field.displayText}</label>
              <div className="col-md-7">
                <Field name={field.fieldName} component={TextInput}/>
              </div>
            </div>
          )
        }

        <div className="form-group row btn-toolbar" style={btnToolbar}>
          <Button style="success" disabled={pristine || submitting} type="submit">Save</Button>
          <Button onClick={this.resetForm}>Cancel</Button>
        </div>
      </form>
    );
  }
}

EditCollectionRowForm.propTypes = {
  pristine     : React.PropTypes.bool,
  submitting   : React.PropTypes.bool,
  handleSubmit : React.PropTypes.func.isRequired,
  reset        : React.PropTypes.func.isRequired,

  toggleModal : React.PropTypes.func,

  fields : React.PropTypes.object.isRequired,
};

export default reduxForm({
  form : "EditCollectionRow",
})(EditCollectionRowForm);
