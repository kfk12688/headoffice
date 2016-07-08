import React from "react";
import FormFieldFactory from "../Utils/FormFieldFactory";

class EGPostFields extends React.Component {
  constructor(props) {
    super(props);
    const factory = new FormFieldFactory();
    this.node = factory.getElement(props.col.renderType);
  }

  render() {
    const { col, row, colKey } = this.props;
    let props = {
      caption        : col.displayText,
      refFieldSource : col.refFieldSource,
      refList        : col.source,
      refTableSource : col.refTableSource,
    };

    if (row !== undefined) {
      props = { ...props, data : row[colKey].val };
    }

    return React.createElement(
      this.node,
      props
    );
  }
}

export { EGPostFields };
