import React from "react";
import { EGHeaderRow } from "./EGHeaderRow";
import { EGBody } from "./EGBody";
import calcColWidths from "../calculateColWidths";
import cx from "classnames";
import styles from "./EG.less";

const EntryGrid = (props) => {
  const { style, className, spec, data, isLoading } = props;
  const colWidths = calcColWidths(spec, data);

  return (
    <div
      className={cx(styles.base, className)}
      style={style}
    >
      {/* Table Nav and Meta Container */}
      <div className={styles.tableMetaContainer}>
        <div>
          <i className="fa fa-angle-double-left"></i>
          <i className="fa fa-angle-left"></i>
          <i className="fa fa-angle-right"></i>
          <i className="fa fa-angle-double-right"></i>
        </div>
        <div className={styles.rightAlign}>{Object.keys(data).length} Entries</div>
      </div>

      {/* Table Container */}
      <div className={styles.tableContainer}>
        <EGHeaderRow
          cols={spec}
          colWidths={colWidths}
        />

        {
          isLoading ?
          <i className={cx("fa fa-spinner fa-2x", styles.spinner)}/> :
          <EGBody
            cols={spec}
            colWidths={colWidths}
            rows={data}
          />
        }
      </div>
    </div>
  );
};

EntryGrid.propTypes = {
  style     : React.PropTypes.object,
  className : React.PropTypes.string,
  isLoading : React.PropTypes.object,
  spec      : React.PropTypes.array.isRequired,
  data      : React.PropTypes.object.isRequired,
};

export { EntryGrid };
