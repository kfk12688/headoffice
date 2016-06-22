/**
 * Created by sharavan on 02/06/16.
 */
import React from "react";
import FormFieldFactory from "../Utils/FormFieldFactory";

// interface IEGPostFieldsProps {
//   col: IEGCol;
//   colKey?: string;
//   row?: IEGRow;
// }

class EGPostFields extends React.Component {
  constructor() {
    super();
    let factory = new FormFieldFactory();
    this.node = factory.getElement(this.props.col.renderType);
  }

  render():JSX.Element {
    const { col, row, colKey } = this.props;
    const source = {
      refFieldSource : col.refFieldSource,
      refList        : col.source,
      refTableSource : col.refTableSource,
    };

    let props = {
      caption : col.displayText,
      cb      : () => {
      },
      source,
    };
    if (row !== undefined) {
      props = Object.assign({}, props, { data: row[colKey].val });
    }

    return React.createElement(
      this.node,
      props
    );
  }
}

export { EGPostFields };
