import React from "react";
import { Sticky } from "react-sticky";
import { SDHeaderCol } from "./SDHeaderCol";
import styles from "./common.less";
import { imap } from "utils";

const SDHeaderRow = ({ cols, colWidths }) => {
  const mapToSDHeaderCols = (col, colKey) => <SDHeaderCol key={colKey}
                                                          colWidth={colWidths[colKey]}
                                                          headerStyle={col.headerStyle}
                                                          displayText={col.displayText}/>;

  return (
    <Sticky topOffset={-50} stickyStyle={{ marginTop : 50 }}>
      <div className={styles.row}>{imap(mapToSDHeaderCols, cols)}</div>
    </Sticky>
  );
};

SDHeaderRow.propTypes = {
  cols      : React.PropTypes.object.isRequired,
  colWidths : React.PropTypes.object.isRequired,
};

export { SDHeaderRow };
