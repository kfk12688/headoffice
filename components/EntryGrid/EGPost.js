import React from "react";
import _ from "underscore";
import EGForm from "./EGForm";
import styles from "./EGPost.less";

const ADD_NEW_ENTRY = true;
const EDIT_EXISTING_ENTRY = false;

class EGPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entryState : ADD_NEW_ENTRY };
    this.getFormFields = this.getFormFields.bind(this);
  }

  getFormFields(cols) {
    const fields = {};

    _.forEach(cols, col => {
      const { fieldName, fieldSchema, fieldType, displayText } = col;
      let fieldSub = undefined;
      if (Array.isArray(fieldSchema) && (fieldSchema.length !== 0)) fieldSub = this.getFormFields(fieldSchema);

      fields[fieldName] = {
        key   : fieldName,
        type  : fieldType,
        title : displayText,
        sub   : fieldSub,
      };
    });

    return fields;
  }

  render() {
    const { cols, onSubmit } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.postHeading}>
          {this.state.entryState ? "Add new data" : "Edit highlighted data"}
        </div>

        <EGForm
          className={styles.form}
          cols={cols}
          fieldProps={this.getFormFields(cols)}
          onSubmit={onSubmit}
          editorState={this.state.entryState}
        />

      </div>
    );
  }
}

EGPost.propTypes = {
  cols     : React.PropTypes.array.isRequired,
  onSubmit : React.PropTypes.func.isRequired,
};

export { EGPost };
