import React from "react";
import { EGHeaderRow } from "./EGHeaderRow";
import { EGBody } from "./EGBody";
import { EGPost } from "./EGPost";
import FontAwesome from "react-fontawesome";
import styles from "./EG.less";
import cx from "classnames";

class EntryGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { colWidths : props.colWidths };
  }

  render() {
    const { style, className, colSpec, data, isLoading, postHandler, selectedRow, clearEditFlag } = this.props;

    return (
      <div
        className={cx(styles.base, className)}
        style={style}
      >
        <EGHeaderRow
          cols={colSpec}
          colWidths={this.state.colWidths}
        />

        {
          isLoading ?
          <FontAwesome className={styles.spinner} name="spinner" spin size="2x"/> :
          <EGBody
            cols={colSpec}
            colWidths={this.state.colWidths}
            rows={data}
            selectedRow={selectedRow}
          />
        }

        <EGPost
          cols={colSpec}
          postHandler={postHandler}
          clearEditFlag={clearEditFlag}
          selectedRow={selectedRow}
        />
      </div>
    );
  }
}

export { EntryGrid };
