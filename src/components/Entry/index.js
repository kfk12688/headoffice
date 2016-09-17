import React from "react";
import _ from "underscore";
import EGForm from "./EGForm";
import styles from "./EGPost.less";

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
    const { spec, onSubmit, className, templateName } = this.props;

    return (
      <div className={className}>
        <div className={styles.title}>{`Add a new row to ${templateName} table`}</div>

        <EGForm
          className={styles.form}
          cols={spec}
          fieldProps={this.getFormFields(spec)}
          onSubmit={onSubmit}
        />

      </div>
    );
  }
}

Entry.propTypes = {
  className    : React.PropTypes.string,
  templateName : React.PropTypes.string,
  spec         : React.PropTypes.array.isRequired,
  onSubmit     : React.PropTypes.func.isRequired,
};

export { Entry };
