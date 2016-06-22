/**
 * Created by sharavan on 02/06/16.
 */
import React from "react";
import { EGPostFields } from "./EGPostFields";
import { Divider } from "../Divider/index";
import { FormButton } from "../Button/index";
import cx from "classnames";
import styles from "./EGPost.less";

// enum EntryStateEnum {
//   insert,
//   edit
// }
//
// interface IEGPostProps {
//   cols: IEGCols;
//   rows: IEGRows;
// }

class EGPost extends React.Component {
  constructor() {
    super();
    this.state = { entryState : "insert" };
  }

  render() {
    const cols = this.props.cols;
    let formElements = [];

    if (this.state.entryState === EntryStateEnum.insert) {
      formElements = [];
      for (let colKey in cols) {
        if (cols.hasOwnProperty(colKey)) {
          const isFieldInsertable = (col.insertable === undefined) || col.insertable;
          let col = cols[colKey];
          if (isFieldInsertable) {
            formElements.push(<EGPostFields key={colKey} col={col}/>);
          }
        }
      }
    } else {
      formElements = [];
      for (let colKey in cols) {
        if (cols.hasOwnProperty(colKey)) {
          const isFieldInsertable = (col.insertable === undefined) || col.insertable;
          let col = cols[colKey];
          let row = this.props.rows["11333"];
          if (isFieldInsertable) {
            formElements.push(<EGPostFields key={colKey} col={col} colKey={colKey} row={row}/>);
          }
        }
      }
    }

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
          {formElements}
        </form>
        <Divider size={1} style={{ margin: "10px 0" }}/>
        <div className={styles.postSubmit}>
          {
            this.state.entryState === "insert" ?
            <FormButton accent>Add</FormButton> :
            <FormButton accent>Edit</FormButton>
          }
          <FormButton>Cancel</FormButton>
        </div>
      </div>
    );
  }
}

export { EGPost };
