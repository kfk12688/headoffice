/**
 * Created by sharavan on 18/05/16.
 */
import React from "react";
import { EGHeaderRow } from "./EGHeaderRow";
import { EGBody } from "./EGBody";
import { EGPost } from "./EGPost";
import FontAwesome from "react-fontawesome";
import styles from "./EG.less";
import cx from "classnames";

class EG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colWidths : {
        action         : 45,
        fieldName      : 130,
        fieldReference : 170,
        fieldType      : 120,
        fieldValue     : 150,
      },
    };
  }

  renderContent(props) {
    if (props.isLoading) {
      return <FontAwesome className={styles.spinner} name="spinner" spin size="2x"/>;
    }

    return (
      <EGBody
        cols={props.colSpec}
        colWidths={this.state.colWidths}
        rows={props.data}
      />
    );
  }

  render() {
    const { className, colSpec, data } = this.props;

    return (
      <div className={cx(styles.base, className)}>
        <EGHeaderRow
          cols={colSpec}
          colWidths={this.state.colWidths}
        />
        {this.renderContent(this.props)}
        <EGPost
          cols={colSpec}
          rows={data}
        />
      </div>
    );
  }
}

export { EG };
