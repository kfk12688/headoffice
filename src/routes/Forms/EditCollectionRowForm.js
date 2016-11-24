import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { getComponentFromType, Button } from "components";

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
          fields.map(field => {
            const renderComponent = getComponentFromType(field.type, field.props);

            return (
              <div className="form-group row">
                <label className="offset-md-1 col-md-3">{field.title}</label>
                <div className="col-md-7">
                  <Field name={field.key} {...renderComponent}/>
                </div>
              </div>
            );
          })
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
  pristine      : React.PropTypes.bool,
  submitting    : React.PropTypes.bool,
  handleSubmit  : React.PropTypes.func.isRequired,
  reset         : React.PropTypes.func.isRequired,
  initialValues : React.PropTypes.object.isRequired,

  toggleModal : React.PropTypes.func,

  fields : React.PropTypes.object.isRequired,
};

export default reduxForm({
  form : "EditCollectionRow",
})(EditCollectionRowForm);
