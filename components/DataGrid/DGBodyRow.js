/**
 * Created by sharavan on 18/05/16.
 */
import React from "react";
import { DGBodyCell } from "./DGBodyCell";
import { grey50, transparent, blueGrey50 } from "../../styles/colors";
import styles from "./DGBodyRow.less";

class DGBodyRow extends React.Component {
  constructor() {
    super();
    this.state = { hovered : false };
  }

  render() {
    const { cols, row, colWidths, onRowClick, rowKey, isRowSelected } = this.props;

    const dataGridBodyCells = cols.map((col, index) => {
      const colName = col.name;

      return (
        <DGBodyCell
          key={`${row.id} ${index}`}
          col={col}
          colWidth={colWidths[colName]}
          row={row}
          isSelected={isRowSelected}
        />
      );
    });

    let rowStyle = {
      backgroundColor : isRowSelected ?
                        blueGrey50 :
                        this.state.hovered ?
                        grey50 :
                        transparent,
    };

    return (
      <div
        style={rowStyle}
        className={styles.row}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        onClick={onRowClick.bind(this, rowKey)}
      >
        {dataGridBodyCells}
      </div>
    );
  }
}

export { DGBodyRow };
