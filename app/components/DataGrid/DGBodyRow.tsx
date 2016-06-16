/**
 * Created by sharavan on 18/05/16.
 */
import * as React from "react";
import { DGBodyCell } from "./DGBodyCell";
import { IColProps, IRowProps } from "./DGTypes";
import { grey50, transparent, blueGrey50 } from "../../styles/colors";

interface IDGBodyRowProps {
  row: IRowProps;                               // the object from IDataGridBody rows
  cols: IColProps[];
  colWidths: any;
  selectedKeys: any;
  onRowClick: Function;
  rowIndex: number;
}
// State
interface IDGBodyRowState {
  hovered?: boolean;
}

class DGBodyRow extends React.Component<IDGBodyRowProps, IDGBodyRowState> {
  state: IDGBodyRowState = {
    hovered: false,
  };

  render(): JSX.Element {
    let { cols, row, colWidths, onRowClick, rowIndex } = this.props;
    const dataGridBodyCells = cols.map((col: IColProps, index: number) => {
      let colName = col.name;

      return (
        <DGBodyCell
          key={+(row.id + "" + index)}
          col={col}
          colWidth={colWidths[colName]}
          row={row}
          isSelected={row.isSelected}
        />
      );
    });

    let rowStyle = {
      backgroundColor: row.isSelected ?
                       blueGrey50 :
                       this.state.hovered ?
                       grey50 :
                       transparent,
    };

    return (
      <div
        style={rowStyle}
        className="ho-datagrid-body-row"
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        onClick={onRowClick.bind(this, rowIndex)}
      >
        {dataGridBodyCells}
      </div>
    );
  }
}

export { DGBodyRow }
