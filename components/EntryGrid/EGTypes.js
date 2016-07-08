/*


/!**
 * Created by sharavan on 01/06/16.
 *!/
import moment = require("moment/moment");

// <editor-fold desc="Interfaces">
interface IActions {
  displayText: string;
  cb: Function;
}

/!**—
 * Column Types for the EntryGrid
 * Common root interface
 *!/
interface IEGCol {
  /!**
   * Required fields
   *!/
  displayText: string;
  renderType: string;

  /!**
   * Optional fields
   *!/
  actions?: {
    [actionObjectKey: string]: IActions;
  };
  insertable?: boolean;
  sortable?: boolean;
  headerStyle?: {
    [key: string]: string | number;
  };
  colStyle?: {
    [key: string]: string | number;
  };
  formatter?: Function;
  // Necessary for conversion to decimal if a numeric value is given
  roundToPlace?: number;
  // Only applicable in case of fieldReference
  refTableSource?: {
    key: number;
    val: string;
  }[];
  refFieldSource?: {
    key: number;
    val: string;
  }[];
  // Applies only in case of a list (<select> tag)
  source?: {
    key: number;
    val: string;
  }[];
}

/!**
 * Cell Type Interfaces for the Entry Grid
 * Common root interface
 *!/
interface IEGCell {
  /!**
   * Required Fields
   *!/
  val: number |
    string |
    moment.Moment |
    {
      refTable?: {
        key: number;
        name: string;
      };
      refField?: {
        key: number;
        name: string;
      };
      [key: number]: string;
    };
  /!**
   * Optional Fields
   *!/
  isEditable?: boolean;
}

interface IEGCols {
  [colKey: string]: IEGCol;
}
interface IEGRow {
  [cellKey: string]: IEGCell;
}
interface IEGRows {
  [rowKey: string]: IEGRow;
}
// </editor-fold>

export {
  IEGCell,
  IEGCol,
  IEGRow,
  IEGCols,
  IEGRows,
}


*/
