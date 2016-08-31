import React from "react";
import { SDHeaderRow } from "./SDHeaderRow";
import { SDBody } from "./SDBody";
import { SDPost } from "./SDPost";
import FontAwesome from "react-fontawesome";
import styles from "./SD.less";
import cx from "classnames";

class SpecDefiner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { colWidths : props.colWidths };
  }

  render() {
    const { className, colSpec, data, isLoading, postHandler, selectedRow, clearEditFlag } = this.props;

    return (
      <div
        className={cx(styles.base, className)}
      >
        <div className={styles.tableInfo}>{data && data.length} Fields</div>

        <div className={styles.tableContent}>
          <SDHeaderRow
            cols={colSpec}
            colWidths={this.state.colWidths}
          />

          {
            isLoading ?
            <FontAwesome className={styles.spinner} name="spinner" spin size="2x"/> :
            <SDBody
              cols={colSpec}
              colWidths={this.state.colWidths}
              rows={data}
              selectedRow={selectedRow}
            />
          }
        </div>

        <SDPost
          cols={colSpec}
          postHandler={postHandler}
          clearEditFlag={clearEditFlag}
          selectedRow={selectedRow}
        />
      </div>
    );
  }
}

SpecDefiner.propTypes = {
  className     : React.PropTypes.string,
  colWidths     : React.PropTypes.object.isRequired,
  colSpec       : React.PropTypes.object.isRequired,
  data          : React.PropTypes.arrayOf(React.PropTypes.object),
  isLoading     : React.PropTypes.bool,
  postHandler   : React.PropTypes.func.isRequired,
  selectedRow   : React.PropTypes.any,
  clearEditFlag : React.PropTypes.func,
};

export { SpecDefiner };
