/**
 * Created by sharavan on 01/06/16.
 */
import React from "react";
import { grey50 } from "../../styles/colors";
import styles from "./EGHeaderCol.less";

class EGHeaderCol extends React.Component {
  constructor() {
    super();
    this.state = { hovered : false };
  }

  render() {
    const { headerStyle, displayText, colWidth } = this.props;
    const hoverStyle = {
      backgroundColor : this.state.hovered && grey50,
      cursor          : this.state.hovered && "pointer",
      textDecoration  : this.state.hovered && "underline",
      width           : colWidth,
    };

    return (
      <div
        className={styles.col}
        style={{ ...hoverStyle, ...headerStyle }}
        onMouseOver={() => this.setState({ hovered : true })}
        onMouseOut={() => this.setState({ hovered : false })}
      >
        <div className={styles.cell} title={displayText}>{displayText}</div>
      </div>
    );
  }
}

EGHeaderCol.propTypes = {
  headerStyle : React.PropTypes.object,
  displayText : React.PropTypes.string.isRequired,
  colWidth    : React.PropTypes.number,
};

export { EGHeaderCol };
