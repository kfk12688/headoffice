/**
 * Created by RSH on 07.05.2016.
 */

import * as React from "react";
import { CheckboxEmptySvg, CheckboxCheckedSvg } from "../internal/svg-icons/CheckboxSvg";

function getStyles(props: IProps): any {
  return {
    input: {
      boxSizing    : "border-box",
      cursor       : "pointer",
      left         : 0,
      margin       : 0,
      opacity      : 0,
      padding      : 0,
      pointerEvents: "all",
      zIndex       : 2,
    },
    root : {
      height  : "100%",
      position: "absolute",
      width   : "100%",
    },
  };
}

interface IProps {
  /**
   * Describes if the checkbox is checked or not
   * to be passed as a prop from the parent
   */
  checked: boolean;
  /**
   * Parent handler action for checkbox click action
   */
  handler: React.MouseEventHandler;
}

interface IState {
  switched: boolean;
}

class Checkbox extends React.Component < IProps, IState > {
  state: IState = {
    switched: false,
  };

  private checkboxElement: React.ReactElement<{}> = React.createElement(CheckboxEmptySvg, {});

  constructor(props: IProps) {
    super(props);
  }

  componentWillReceiveProps(nextProps: IProps): void {
    this.setState({
      switched: this.props.checked !== nextProps.checked ?
                nextProps.checked :
                this.state.switched,
    });
  }

  render(): JSX.Element {
    const style        = getStyles(this.props);
    const rootStyle    = Object.assign({}, style.root, {
      height: 20,
      width : 20,
    });
    const elementStyle = Object.assign({}, style.root, { display: "flex" });
    const inputStyle   = Object.assign({}, style.input, style.root);

    return (
      <span style={rootStyle}>
        <input type="checkbox" style={inputStyle} checked={this.props.checked} onClick={this.handleClick}/>
        <div style={elementStyle}>
          {this.checkboxElement}
        </div>
      </span>
    );
  }

  private handleClick: React.MouseEventHandler = (event: React.MouseEvent) => {
    this.checkboxElement = (
      <div>
        {
          this.state.switched ?
          React.createElement(CheckboxEmptySvg, {}) :
          React.createElement(CheckboxCheckedSvg, {})
        }
      </div>
    );

    this.props.handler(event);
  };
}

export { Checkbox };
