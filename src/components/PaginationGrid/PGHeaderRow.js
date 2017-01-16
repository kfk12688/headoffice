import { imap } from "utils";
import React from "react";
import { Sticky } from "react-sticky";
import { PGHeaderCell } from "./PGHeaderCell";
import styles from "./common.less";

const PGHeaderRow = ({ cols, colWidths, scrollLeft, topOffset }) => {
  const mapToPGHeaderCells = (col, colKey) => <PGHeaderCell key={colKey}
                                                            colWidth={colWidths[col.fieldName]}
                                                            headerStyle={col.headerStyle}
                                                            displayText={col.displayText}/>;

  return (
    <Sticky topOffset={-topOffset}
            stickyStyle={{
              zIndex    : 100,
              overflow  : "auto",
              marginTop : topOffset,
            }}
    >
      <div className={styles.row} style={{ marginLeft : -scrollLeft }}>
        {imap(mapToPGHeaderCells, cols)}
      </div>
    </Sticky>
  );
};

PGHeaderRow.propTypes = {
  cols       : React.PropTypes.array.isRequired,
  colWidths  : React.PropTypes.object.isRequired,
  scrollLeft : React.PropTypes.number,
  topOffset  : React.PropTypes.number,
};
export { PGHeaderRow };
