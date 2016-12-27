import React from "react";
import _ from "underscore";
import { Link } from "react-router";
import EGForm from "./EGForm";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.getFormFields = this.getFormFields.bind(this);
  }

  getFormFields(schemaFields) {
    const fields = {};

    _.forEach(schemaFields, field => {
      const { fieldName, fieldSchema, fieldType, fieldProps, displayText } = field;
      let fieldSub                                                         = undefined;
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
    const { spec, onSubmit, className, templateName, collectionName } = this.props;

    if (_.isEmpty(spec)) {
      return (
        <div>
          <div>{`No field definition is given for ${templateName}`}</div>
          <div>Goto <Link to={`/templates/${collectionName}`}>{templateName}</Link> to create them</div>
        </div>
      );
    }

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
  className      : React.PropTypes.string,
  templateName   : React.PropTypes.string.isRequired,
  collectionName : React.PropTypes.string.isRequired,
  spec           : React.PropTypes.array.isRequired,
  onSubmit       : React.PropTypes.func.isRequired,
};

export { Entry };
