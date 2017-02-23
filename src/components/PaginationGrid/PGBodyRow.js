import React from "react";
import { imap } from "utils";
import { Button } from "components";
import { PGBodyCell } from "./PGBodyCell";
import cx from "classnames";
import { transparent, grey100 } from "../_styles/colors";
import styles from "./styles.less";

class PGBodyRow extends React.Component {
  constructor() {
    super();
    this.state = { hovered : false };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.deleteRow        = this.deleteRow.bind(this);
    this.handleEditClick  = this.handleEditClick.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hovered : true });
  }

  handleMouseLeave() {
    this.setState({ hovered : false });
  }

  handleEditClick(event) {
    this.props.editItem(this.props.rowKey);
  }

  deleteRow(e) {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete the row?\nID : ${this.props.rowKey}`)) {
      this.props.deleteItem(this.props.rowKey);
    }
  }

  render() {
    const { row, cols, colWidths, rowKey } = this.props;
    const mapToPGBodyCells                 = (col, colKey) => <PGBodyCell key={colKey}
                                                                          col={col}
                                                                          colWidth={colWidths[col.fieldName]}
                                                                          row={row}/>;
    const bodyCells                        = imap(mapToPGBodyCells, cols);
    const rowStyle                         = { backgroundColor : this.state.hovered ? grey100 : transparent };

    return (
      <div style={rowStyle}
           className={styles.row}
           data-id={rowKey}
           onMouseEnter={this.handleMouseEnter}
           onMouseLeave={this.handleMouseLeave}
      >
        {bodyCells}
        {
          this.state.hovered &&
          <div className={cx(styles.btnLink, "btn-group", "btn-group-sm")}>
            <Button onClick={this.handleEditClick} faName="edit"/>
            <Button onClick={this.deleteRow} faName="times"/>
          </div>
        }
      </div>
    );
  }
}

PGBodyRow.propTypes = {
  cols       : React.PropTypes.array.isRequired,
  colWidths  : React.PropTypes.object.isRequired,
  row        : React.PropTypes.object.isRequired,
  rowKey     : React.PropTypes.string,
  deleteItem : React.PropTypes.func.isRequired,
  editItem   : React.PropTypes.func.isRequired,
};
export { PGBodyRow };
