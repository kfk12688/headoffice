/**
 * Created by sharavan on 01/06/16.
 */
import * as React from "react";
import { IEGCols, IEGCol } from "./EGTypes";
import { EGHeaderCol } from "./EGHeaderCol";

/**
 * EntryGridHeaderRow Interface
 * Is the parent for the array of EntryGridHeaderColumn Elements
 */
// Props
interface IEGHeaderRowProps {
  cols: IEGCols;
  colWidths: any;
}

class EGHeaderRow extends React.Component <IEGHeaderRowProps, {}> {
  render(): JSX.Element {
    const { cols, colWidths } = this.props;
    let headerRowCols: React.ReactElement<IEGCol>[] = [];

    for (let colKey in cols) {
      if (cols.hasOwnProperty(colKey)) {
        let col = cols[colKey];

        headerRowCols.push(
          <EGHeaderCol
            key={colKey}
            colWidth={colWidths[colKey]}
            headerStyle={col.headerStyle}
            displayText={col.displayText}
          />
        );
      }
    }

    return <div className="ho-entrygrid-header-row">{headerRowCols}</div>;
  }
}

export { EGHeaderRow }
