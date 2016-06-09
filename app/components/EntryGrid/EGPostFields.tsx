/**
 * Created by sharavan on 02/06/16.
 */
import * as React from "react";
import { IEGCol, IEGRow } from "./EGTypes";
import FormFieldFactory from "../Utils/FormFieldFactory";

// <editor-fold desc="EGPostFields Interface">
interface IEGPostFieldsProps {
  col: IEGCol;
  colKey?: string;
  row?: IEGRow;
}
// </editor-fold>

class EGPostFields extends React.Component <IEGPostFieldsProps, {}> {
  node: React.StatelessComponent<any>;

  componentWillMount(): void {
    let factory = new FormFieldFactory();
    this.node   = factory.getElement(this.props.col.renderType);
  }

  render(): JSX.Element {
    const { col, row, colKey }    = this.props;
    const source = {
      refFieldSource: col.refFieldSource,
      refList       : col.source,
      refTableSource: col.refTableSource,
    };

    let props = {
      caption: col.displayText,
      cb     : () => {},
      source : source,
    };
    if (row !== undefined) {
      props = Object.assign({}, props, {data: row[colKey].val});
    }

    return React.createElement(
      this.node,
      props
    );
  }
}

export { EGPostFields }
