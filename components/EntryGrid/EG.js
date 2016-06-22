/**
 * Created by sharavan on 18/05/16.
 */
import React from "react";
import { EGHeaderRow } from "./EGHeaderRow";
import { EGBody } from "./EGBody";
import { EGPost } from "./EGPost";
import { colSpec, data } from "../../data/EGData";
import styles from "./EG.less";
import cx from "classnames";

class EG extends React.Component {
  constructor() {
    super();
    this.state = {
      colWidths : {
        action         : 45,
        fieldName      : 130,
        fieldReference : 170,
        fieldType      : 120,
        fieldValue     : 150,
      },
      rows      : this.props.rows,
    };
  }

  render() {
    return (
      <div className={cx(styles.base, this.props.className)}>
        <EGHeaderRow
          cols={colSpec}
          colWidths={this.state.colWidths}
        />
        <EGBody
          cols={colSpec}
          colWidths={this.state.colWidths}
          rows={data}
        />
        <EGPost
          cols={colSpec}
          rows={data}
        />
      </div>
    );
  }
}

export { EG };
