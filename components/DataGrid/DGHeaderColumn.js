/**
 * Created by sharavan on 18/05/16.
 */
import React, { Component, PropTypes } from "react";
import FontAwesome from "react-fontawesome";
import { grey50 } from "../../styles/colors";
import styles from "./DGHeaderColumn.less";

class DGHeaderColumn extends Component {
  constructor() {
    super();
    this.state = { hovered : false };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleMouseOver(event) {
    this.setState({ hovered : true });
  }

  handleMouseOut(event) {
    this.setState({ hovered : false });
  }

  onClick(dataKey, event) {
    if (this.props.sortAscending) {
      this.props.onClick(dataKey, "desc", event);
    } else {
      this.props.onClick(dataKey, "asc", event);
    }
  }

  render() {
    // Props
    const { col, colWidth, sorted } = this.props;

    // Inline styles
    const hoverStyle = {
      backgroundColor : this.state.hovered && grey50,
      cursor          : this.state.hovered && "pointer",
      textDecoration  : this.state.hovered && "underline",
      width           : colWidth,
    };

    // Local vars
    const isColSortable = (col.sortable === undefined) || col.sortable;
    let arrow = undefined;

    if (isColSortable && sorted) {
      if (this.props.sortAscending) {
        arrow = <FontAwesome className={styles.fa} name="long-arrow-down"/>;
      } else {
        arrow = <FontAwesome className={styles.fa} name="long-arrow-up"/>;
      }
    }

    return (
      <span
        className={styles.col}
        style={{ ...hoverStyle, ...this.props.col.headerStyle }}
        onMouseOver={isColSortable && this.handleMouseOver}
        onMouseOut={isColSortable && this.handleMouseOut}
        onClick={isColSortable && this.onClick.bind(this, col.dataKey)}
      >
        <div className={styles.cell}>
          <span>{col.text}</span>
        </div>
        {arrow}
        <div className={styles.divider}/>
      </span>
    );
  }
}

DGHeaderColumn.PropTypes = {
  col           : PropTypes.object.isRequired,
  colWidth      : PropTypes.number.isRequired,
  onClick       : PropTypes.func.isRequired,
  sorted        : PropTypes.boolean,
  sortAscending : PropTypes.boolean,
};

export { DGHeaderColumn };
