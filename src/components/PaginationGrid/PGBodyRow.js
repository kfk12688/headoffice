import React from "react";
import _ from "underscore";
import { Button, Modal } from "components";
import { PGBodyCell } from "./PGBodyCell";
import { transparent, grey100 } from "../_styles/colors";
import styles from "./common.less";

class PGBodyRow extends React.Component {
  constructor() {
    super();
    this.state = { hovered : false, showModal : false };
    this.modalDialog = null;

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hovered : true });
  }

  handleMouseLeave() {
    this.setState({ hovered : false });
  }

  deleteRow(e) {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete the row?\nID : ${this.props.rowKey}`)) {
      this.props.deleteRow(this.props.rowKey);
    }
  }

  handleEditClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      showModal : true,
    });
  }

  render() {
    const { row, cols, colWidths, rowKey } = this.props;

    let bodyCells = [];
    _.forEach(cols, (col, colKey) => {
      bodyCells.push(
        <PGBodyCell
          key={colKey}
          col={col}
          colWidth={colWidths[col.fieldName]}
          row={row}
        />
      );
    });

    const rowStyle = { backgroundColor : this.state.hovered ? grey100 : transparent };

    return (
      <div
        style={rowStyle}
        className={styles.row}
        data-id={rowKey}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {bodyCells}
        {
          this.state.hovered &&
          <div style={{ position : "absolute", left : "90%", margin : 5 }} className="btn-group btn-group-sm">
            <Button onClick={this.handleEditClick} faName="edit"/>
            <Button onClick={this.deleteRow} faName="times"/>
          </div>
        }

        <div style={{ visibility : "hidden", display : "none" }}>
          <Modal
            modalTitle="Edit Template"
            faName="edit"
            show={this.state.showModal}
            showModal={e => this.setState({ showModal : true })}
            hideModal={e => this.setState({ showModal : false })}
          >
            hello
          </Modal>
        </div>
      </div>
    );
  }
}

PGBodyRow.propTypes = {
  cols      : React.PropTypes.array.isRequired,
  colWidths : React.PropTypes.object.isRequired,
  row       : React.PropTypes.object.isRequired,
  rowKey    : React.PropTypes.string,
};

export { PGBodyRow };
