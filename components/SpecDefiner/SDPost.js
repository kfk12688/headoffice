import React from "react";
import EGForm from "./SDForm";
import styles from "./SDPost.less";

const ADD_NEW_ENTRY = true;
const EDIT_EXISTING_ENTRY = false;

class SDPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entryState : ADD_NEW_ENTRY };
    this.keys = this.getFormFields(props.cols);
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
    for (const k in cols) {
      const col = cols[k];

      if (col.insertable !== false) {
        const { fieldKey } = col;
        if (Array.isArray(fieldKey)) {
          for (let i = 0; i < fieldKey.length; i++) {
            fields.push(`${k}.${fieldKey[i]}`);
          }
        } else if (k !== fieldKey) {
          fields.push(`${k}.${fieldKey}`);
        } else {
          fields.push(fieldKey);
        }
      }
    }

    return fields;
  }

  render() {
    const { cols, postHandler, clearEditFlag } = this.props;

    return (
      <div className={styles.post}>

        <EGForm
          className={styles.fieldsForm}
          cols={cols}
          fields={this.keys}
          submitForm={postHandler}
          clearEditFlag={clearEditFlag}
          editorState={this.state.entryState}
        />

      </div>
    );
  }
}

export { SDPost };
