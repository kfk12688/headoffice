/**
 * Created by sharavan on 18/05/16.
 */
import * as React from "react";
import { EGHeaderRow } from "./EGHeaderRow";
import { EGBody } from "./EGBody";
import { EGPost } from "./EGPost";
import { IEGRows, IEGCols } from "./EGTypes";
import { colSpec, data } from "../../data/EGData";
import "./EG.less";

// <editor-fold desc="EntryGrid Interface : Encompasses EntryGridHeaderRow and EntryGridBody">
// Props
interface IEGProps {
  rows: IEGRows;
  cols: IEGCols;
}
// State
interface IEGState {
  rows?: IEGRows;
  colWidths?: {
    [colKey: string]: number;
  };
}
// </editor-fold>

class EG extends React.Component <IEGProps, IEGState> {
  state: IEGState = {
    colWidths: {
      "action"        : 45,
      "fieldName"     : 130,
      "fieldReference": 170,
      "fieldType"     : 120,
      "fieldValue"    : 150,
    },
    rows     : this.props.rows,
  };

  render(): JSX.Element {
    return (
      <div className="ho-entrygrid">
        <EGHeaderRow
          cols={colSpec}
          colWidths={this.state.colWidths}
        />
        <EGBody
          cols={colSpec}
          colWidths={this.state.colWidths}
          rows={data}
        />
        <EGPost
          cols={colSpec}
          rows={data}
        />
      </div>
    );
  }
}

export { EG }
