import React from "react";
import { EGHeaderRow } from "./EGHeaderRow";
import { EGBody } from "./EGBody";
import { EGPost } from "./EGPost";
import FontAwesome from "react-fontawesome";
import styles from "./EG.less";
import calcColWidths from "../calculateColWidths";
import cx from "classnames";

const EntryGrid = (props) => {
  const { style, className, spec, data, isLoading, onSubmit } = props;
  const colWidths = calcColWidths(spec, data);

  return (
    <div
      className={cx(styles.base, className)}
      style={style}
    >
      <EGHeaderRow
        cols={spec}
        colWidths={colWidths}
      />

      {
        isLoading.data ?
        <FontAwesome className={styles.spinner} name="spinner" spin size="2x"/> :
        <EGBody
          cols={spec}
          colWidths={colWidths}
          rows={data}
        />
      }

      <EGPost
        cols={spec}
        onSubmit={onSubmit}
      />
    </div>
  );
};

EntryGrid.propTypes = {
  style     : React.PropTypes.object,
  className : React.PropTypes.string,
  isLoading : React.PropTypes.object,
  spec   : React.PropTypes.array.isRequired,
  data      : React.PropTypes.object.isRequired,
  onSubmit  : React.PropTypes.func.isRequired,
};

export { EntryGrid };
