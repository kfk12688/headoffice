import React, { Component, PropTypes } from "react";
import { grey50, grey300 } from "../_styles/colors";
import styles from "./common.less";

class DGHeaderCell extends Component {
  constructor() {
    super();
    this.state = { hovered : false };
    this.ctrls = {};

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut  = this.handleMouseOut.bind(this);
    this.assignCol       = (dataKey, target) => {
      this.ctrls[dataKey] = target;
    };
    this.onDrag          = this.onDrag.bind(this);
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
    const { col, colWidth } = this.props;
    const hoverStyle        = {
      backgroundColor : this.state.hovered && grey50,
      cursor          : this.state.hovered && "pointer",
      textDecoration  : this.state.hovered && "underline",
      borderBottom    : this.state.hovered && `1px solid ${grey300}`,
      width           : colWidth,
    };

    return (
      <span className={styles.headerCell}
            style={{ ...hoverStyle, ...this.props.col.headerStyle }}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
      >
        <span className={styles.headerCellTitle}
              ref={target => this.assignCol(col.name, target)}
        >
          <span>{col.text}</span>
        </span>
        <span onDragEnd={e => this.onDrag(e, col.name)}/>
      </span>
    );
  }
}

DGHeaderCell.propTypes = {
  col      : PropTypes.object.isRequired,
  colWidth : PropTypes.number.isRequired,
  onDrag   : PropTypes.func,
};

export { DGHeaderCell };
