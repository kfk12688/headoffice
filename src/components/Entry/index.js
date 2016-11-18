import React from "react";
import _ from "underscore";
import EGForm from "./EGForm";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.getFormFields = this.getFormFields.bind(this);
  }

  getFormFields(cols) {
    const fields = {};

    _.forEach(cols, col => {
      const { fieldName, fieldSchema, fieldType, fieldProps, displayText } = col;
      let fieldSub = undefined;
      if (Array.isArray(fieldSchema) && (fieldSchema.length !== 0)) fieldSub = this.getFormFields(fieldSchema);

      fields[fieldName] = {
        key   : fieldName,
        type  : fieldType,
        title : displayText,
        props : fieldProps,
        sub   : fieldSub,
      };
    });

    return fields;
  }

  render() {
    const { spec, onSubmit, className } = this.props;

    return (
      <EGForm
        className={className}
        cols={spec}
        fieldProps={this.getFormFields(spec)}
        onSubmit={onSubmit}
      />
    );
  }
}

Entry.propTypes = {
  className : React.PropTypes.string,
  spec      : React.PropTypes.array.isRequired,
  onSubmit  : React.PropTypes.func.isRequired,
};

export { Entry };
