import React from "react";
import { grey50 } from "../_styles/colors";
import styles from "./SDHeaderCol.less";

class EGHeaderCol extends React.Component {
  constructor() {
    super();
    this.state = { hovered : false };
  }

  render() {
    // Props
    const { headerStyle, displayText, colWidth } = this.props;

    const hoverStyle = {
      backgroundColor : this.state.hovered && grey50,
      cursor          : this.state.hovered && "pointer",
      textDecoration  : this.state.hovered && "underline",
      width           : colWidth,
    };

    return (
      <span
        className={styles.col}
        style={{ ...hoverStyle, ...headerStyle }}
        onMouseOver={() => this.setState({ hovered : true })}
        onMouseOut={() => this.setState({ hovered : false })}
      >
        <div className={styles.cell}>
          <span>{displayText}</span>
        </div>
      </span>
    );
  }
}

EGHeaderCol.propTypes = {
  headerStyle : React.PropTypes.object,
  displayText : React.PropTypes.string,
  colWidth    : React.PropTypes.number,
};

export { EGHeaderCol };
