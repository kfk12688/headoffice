/**
 * Created by sharavan on 02/06/16.
 */
import * as React from "react";
import { EGPostFields } from "./EGPostFields";
import { Divider } from "../Divider/index";
import { FormButton } from "../Button/index";
import { IEGCols, IEGRows, IEGRow } from "./EGTypes";
let cx: any = require("classnames");

enum EntryStateEnum {
  insert,
  edit
}

// <editor-fold desc="EGPost Interface">
interface IEGPostProps {
  cols: IEGCols;
  rows: IEGRows;
}
interface IEGPostState {
  entryState?: EntryStateEnum;
}
// </editor-fold>

class EGPost extends React.Component <IEGPostProps, IEGPostState> {
  state: IEGPostState = {
    entryState: EntryStateEnum.insert,
  };

  render(): JSX.Element {
    const cols: IEGCols                         = this.props.cols;
    let formElements: React.ReactElement<any>[] = [];

    if (this.state.entryState === EntryStateEnum.insert) {
      formElements = [];
      for (let colKey in cols) {
        if (cols.hasOwnProperty(colKey)) {
          let col               = cols[colKey];
          let isFieldInsertable = (col.insertable === undefined) || col.insertable;
          if (isFieldInsertable) {
            formElements.push(<EGPostFields key={colKey} col={col}/>);
          }
        }
      }
    } else {
      formElements = [];
      for (let colKey in cols) {
        if (cols.hasOwnProperty(colKey)) {
          let col               = cols[colKey];
          let row: IEGRow       = this.props.rows["11333"];
          let isFieldInsertable = (col.insertable === undefined) || col.insertable;
          if (isFieldInsertable) {
            formElements.push(<EGPostFields key={colKey} col={col} colKey={colKey} row={row}/>);
          }
        }
      }
    }

    return (
      <div className="ho-entrygrid-post">
        <div className="tab">
          <span
            className={cx({"selected" : this.state.entryState === EntryStateEnum.insert})}
            onClick={() => this.setState({entryState: EntryStateEnum.insert})}
          >
            Add New Row
          </span>
          <Divider vertical size={{h:24, w:1}}/>
          <span
            className={cx({"selected" : this.state.entryState === EntryStateEnum.edit})}
            onClick={() => this.setState({entryState: EntryStateEnum.edit})}
          >
            Edit Row
          </span>
        </div>
        <form>
          { formElements }
        </form>
        <Divider size={1} style={{ margin: "10px 0" }}/>
        <div className="submit">
          {
            this.state.entryState === EntryStateEnum.insert ?
            <FormButton accent>Add</FormButton> :
            <FormButton accent>Edit</FormButton>
          }
          <FormButton>Cancel</FormButton>
        </div>
      </div>
    );
  }
}

export { EGPost }
