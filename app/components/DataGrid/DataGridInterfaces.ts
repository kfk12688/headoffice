/**
 * Created by sharavan on 18/05/16.
 */

interface IColProps {
  dataKey?: string;
  name: string;
  text: string;
  renderType?: string;
  sortable?: boolean;
  cellFormatter?: Function;
  headerStyle?: any;
}

type IRowProps = any;

// ********************************************************************************************************** //
// DataGrid Parent Interfaces
// ********************************************************************************************************** //
/**
 * DataGrid Interface
 * Encompasses two other elements namely
 * 1. DataGridHeaderRow
 * 2. DataGridBody
 */
// Props
interface IDataGridProps {
  rows: Array<IRowProps>;
  cols: Array<IColProps>;
  onColumnResize?: Function;
  onClickSortColumn?: Function;
  selectedKeys?: any;
}
// State
interface IDataGridState {
  rows?: Array<IRowProps>;
  colWidths?: any;
  sortKey?: string;
}

// ********************************************************************************************************** //
// Component - 1 : DataGridHeaderRow
// ********************************************************************************************************** //
/**
 * DataGridHeaderRow Interface
 * Is the parent for the array of DataGridHeaderColumn Elements
 */
// Props
interface IDataGridHeaderRowProps {
  cols: Array<IColProps>;
  colWidths: any;
  onClick: Function;
  onColumnResize: Function;
  sortKey: string;
}

/**
 * DataGridHeaderColumn Interface
 */
// Props
interface IDataGridHeaderColumnProps {
  col: IColProps;
  colWidth: number;
  onClick: Function;
  onColumnResize: Function;
  sorted: boolean;
}
// State
interface IDataGridHeaderColumnState {
  hovered?: boolean;
  sortAscending?: boolean;
}

// ********************************************************************************************************** //
// Component - 2 : DataGridBody
// ********************************************************************************************************** //
/**
 * IDataGridBody Interface
 */
// Props
interface IDataGridBodyProps {
  cols: Array<IColProps>;
  colWidths: any;
  rows: Array<IRowProps>;
  selectedKeys: any;
}

/**
 * IDataGridBodyRow Interface
 */
// Props
interface IDataGridBodyRowProps {
  cols: Array<IColProps>;
  colWidths: any;
  row: IRowProps;                               // the object from IDataGridBody rows
  selectedKeys: any;
}
// State
interface IDataGridBodyRowState {
  hovered?: boolean;
  isSelected?: boolean;
}

/**
 * IDataGridBodyCell Interface
 */
interface IDataGridBodyCellProps {
  col: IColProps;
  colWidth: number;                                // the object value from colWidths
  row: IRowProps;
  isSelected: boolean;
  handleClick: Function;
}

export {
  IColProps,
  IRowProps,
  IDataGridProps,
  IDataGridState,
  IDataGridHeaderRowProps,
  IDataGridHeaderColumnProps,
  IDataGridHeaderColumnState,
  IDataGridBodyProps,
  IDataGridBodyRowProps,
  IDataGridBodyRowState,
  IDataGridBodyCellProps,
};
