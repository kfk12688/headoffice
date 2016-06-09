/**
 * Created by sharavan on 01/06/16.
 */
// <editor-fold desc="Imports">
import * as React from "react";
import "font-awesome-webpack";
import { grey50 } from "../../styles/colors";
let FontAwesome: any = require("react-fontawesome");
// </editor-fold>

// <editor-fold desc="Interfaces">
/**
 * EntryGridHeaderColumn Interface
 */
// Props
interface IEGHeaderColumnProps {
  headerStyle: {
    [prop: string]: string | number;
  };
  displayText: string;
  colWidth: number;
}
// State
interface IEGHeaderColumnState {
  hovered?: boolean;
}
// </editor-fold>

class EGHeaderCol extends React.Component <IEGHeaderColumnProps, IEGHeaderColumnState> {
  state: IEGHeaderColumnState = {
    hovered      : false,
  };

  render(): JSX.Element {
    // Props
    const headerStyle = this.props.headerStyle;
    const displayText   = this.props.displayText;
    const colWidth      = this.props.colWidth;

    // <editor-fold desc="Inline Styles">
    const styles  = {
      backgroundColor: this.state.hovered && grey50,
      cursor         : this.state.hovered && "pointer",
      textDecoration : this.state.hovered && "underline",
      width          : colWidth,
    };
    // </editor-fold>

    return (
      <span
        className="ho-entrygrid-header-col"
        style={ Object.assign({}, styles, headerStyle)}
        onMouseOver={() => this.setState({ hovered: true })}
        onMouseOut={() => this.setState({ hovered: false })}
      >
        <div className="ho-entrygrid-header-cell">
          <span>{displayText}</span>
        </div>
      </span>
    );
  };
}

export { EGHeaderCol }
