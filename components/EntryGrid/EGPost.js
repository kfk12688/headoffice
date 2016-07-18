import React from "react";
import EditorEntryForm from "../InputElems";
import cx from "classnames";
import styles from "./EGPost.less";

class EGPost extends React.Component {
  constructor() {
    super();
    this.state = { entryState : "insert" };
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

  getInitialValues() {
    const { initialValues, cols } = this.props;

    if (!(initialValues.fields)) {
      const formFields = this.getFormFields(cols);

      const fields = {};
      for (let i = 0; i < formFields.length; i++) {
        const fieldName = formFields[i];
        fields[fieldName] = {
          val : null,
        };
      }
      return fields;
    }
    return initialValues.fields;
  }

  render() {
    const { cols, postHandler, initialValues } = this.props;

    return (
      <div className={styles.post}>
        <div className={styles.postTab}>
          <span
            className={cx(styles.addTab, { [styles.selected]: this.state.entryState === "insert" })}
            onClick={() => this.setState({ entryState: "insert" })}
          >
            Add New Row
          </span>
          <span
            className={cx(styles.editTab, { [styles.selected]: this.state.entryState === "edit" })}
            onClick={() => this.setState({ entryState: "edit" })}
          >
            Edit Row
          </span>
        </div>
        <EditorEntryForm
          state={this.state.entryState}
          cols={cols}
          fields={this.getFormFields(cols)}
          postHandler={postHandler}
          initialValues={this.getInitialValues()}
        />
      </div>
    );
  }
}

export { EGPost };
