import React from "react";
import _ from "underscore";
import EditorEntryForm from "./EGForm";
import styles from "./EGPost.less";

const ADD_NEW_ENTRY = true;
const EDIT_EXISTING_ENTRY = false;

class EGPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entryState : ADD_NEW_ENTRY };
    this.getFormFields = this.getFormFields.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRow !== null) {
      this.setState({ entryState : EDIT_EXISTING_ENTRY });
    } else {
      this.setState({ entryState : ADD_NEW_ENTRY });
    }
  }

  getFormFields(cols) {
    const fields = [];

    _.forEach(cols, col => {
      if (col.insertable !== false) {
        const { fieldName, fieldSchema } = col;

        if (Array.isArray(fieldSchema) && (fieldSchema.length !== 0)) {
          _.forEach(fieldSchema, subCol => {
            const { fieldName : subFieldName } = subCol;
            fields.push(`${fieldName}.${subFieldName}`);
          });
        } else {
          fields.push(fieldName);
        }
      }
    });

    return fields;
  }

  render() {
    const { cols, postHandler, clearEditFlag } = this.props;

    return (
      <div>
        <div className={styles.postHeading}>
          {this.state.entryState ? "Add new data" : "Edit highlighted data"}
        </div>

        <EditorEntryForm
          className={styles.form}
          cols={cols}
          fields={this.getFormFields(cols)}
          submitForm={postHandler}
          clearEditFlag={clearEditFlag}
          editorState={this.state.entryState}
        />

      </div>
    );
  }
}

EGPost.propTypes = {
  cols          : React.PropTypes.object.isRequired,
  postHandler   : React.PropTypes.func.isRequired,
  clearEditFlag : React.PropTypes.func.isRequired,
};

export { EGPost };
