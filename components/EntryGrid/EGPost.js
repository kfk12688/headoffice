import React from "react";
import { EGPostFields } from "./EGPostFields";
import { Divider } from "../Divider/index";
import { FormButton } from "../Button/index";
import cx from "classnames";
import styles from "./EGPost.less";

class EGPost extends React.Component {
  constructor() {
    super();
    this.state = { entryState : "insert" };
  }

  getFormElements() {
    const cols = this.props.cols;
    let formElements = [];

    if (this.state.entryState === "insert") {
      formElements = [];
      for (let colKey in cols) {
        if (cols.hasOwnProperty(colKey)) {
          let col = cols[colKey];
          const isFieldInsertable = (col.insertable === undefined) || col.insertable;
          if (isFieldInsertable) {
            formElements.push(<EGPostFields key={colKey} col={col}/>);
          }
        }
      }
    } else {
      formElements = [];
      for (let colKey in cols) {
        if (cols.hasOwnProperty(colKey)) {
          let col = cols[colKey];
          const isFieldInsertable = (col.insertable === undefined) || col.insertable;
          let row = this.props.rows["11333"];
          if (isFieldInsertable) {
            formElements.push(<EGPostFields key={colKey} col={col} colKey={colKey} row={row}/>);
          }
        }
      }
    }

    return formElements;
  }

  render() {
    return (
      <div className={styles.post}>
        <div className={styles.postTab}>
          <span
            className={cx({ "selected": this.state.entryState === "insert" })}
            onClick={() => this.setState({ entryState: "insert" })}
          >
            Add New Row
          </span>
          <Divider vertical size={{ h: 24, w: 1 }}/>
          <span
            className={cx({ "selected": this.state.entryState === "edit" })}
            onClick={() => this.setState({ entryState: "edit" })}
          >
            Edit Row
          </span>
        </div>
        <form>
          {this.getFormElements()}
          <div className={styles.postSubmit}>
            {
              this.state.entryState === "insert" ?
              <FormButton accent>Add</FormButton> :
              <FormButton accent>Edit</FormButton>
            }
            <FormButton>Cancel</FormButton>
          </div>
        </form>
      </div>
    );
  }
}

export { EGPost };
