import React, { Component, PropTypes } from "react";
import { grey50, grey300 } from "../_styles/colors";
import styles from "./DGHeaderColumn.less";
import cx from "classnames";

class DGHeaderColumn extends Component {
  constructor() {
    super();
    this.state = { hovered : false };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.ctrls = {};
    this.assignCol = (dataKey, target) => {
      this.ctrls[dataKey] = target;
    };

    this.onClick = this.onClick.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }

  onClick(event) {
    const { col : { dataKey } } = this.props;

    if (this.props.sortAscending) {
      this.props.onClick(dataKey, "desc");
    } else {
      this.props.onClick(dataKey, "asc");
    }
  }

  onDrag(e, colKey) {
    this.props.onDrag(colKey, this.ctrls[colKey], e.screenX);
  }

  handleMouseOver() {
    this.setState({ hovered : true });
  }

  handleMouseOut() {
    this.setState({ hovered : false });
  }

  render() {
    // Props
    const { col, colWidth, sorted } = this.props;

    // Inline styles
    const hoverStyle = {
      backgroundColor : this.state.hovered && grey50,
      cursor          : this.state.hovered && "pointer",
      textDecoration  : this.state.hovered && "underline",
      borderBottom    : this.state.hovered && `1px solid ${grey300}`,
      width           : colWidth,
    };

    // Local vars
    const isColSortable = (col.sortable === undefined) || col.sortable;
    let arrow = undefined;

    if (isColSortable && sorted) {
      if (this.props.sortAscending) {
        arrow = <i className={cx("fa fa-long-arrow-down", styles.fa)}/>;
      } else {
        arrow = <i className={cx("fa fa-long-arrow-up", styles.fa)}/>;
      }
    }

    return (
      <span
        className={styles.col}
        style={{ ...hoverStyle, ...this.props.col.headerStyle }}
        onMouseOver={isColSortable && this.handleMouseOver}
        onMouseOut={isColSortable && this.handleMouseOut}
      >
        <div
          className={styles.cell}
          onClick={isColSortable && this.onClick}
          ref={target => this.assignCol(col.name, target)}
        >
          <span>{col.text}</span>
        </div>
        {arrow}
        <div className={styles.divider} onDragEnd={e => this.onDrag(e, col.name)}/>
      </span>
    );
  }
}

DGHeaderColumn.propTypes = {
  col           : PropTypes.object.isRequired,
  colWidth      : PropTypes.number.isRequired,
  onClick       : PropTypes.func,
  onDrag        : PropTypes.func,
  sorted        : PropTypes.bool,
  sortAscending : PropTypes.bool,
};

export { DGHeaderColumn };
