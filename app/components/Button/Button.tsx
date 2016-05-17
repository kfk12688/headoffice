/**
 * Created by sharavan on 12/05/16.
 */

import * as React from "react";
import { blackLight, blackDark } from "../internal/styles/colors";

interface IProps {
  /**
   * Specifies the hovercolor for the button element
   */
  hoverColor?: string;
  /**
   * Specifies the default color for the button element
   */
  color?: string;
  /**
   * Custom user style for button component
   */
  style?: Object;
}

interface IState {
  /**
   * Controls the hovered state of the button element
   */
  hovered: boolean;
}

function getStyles(props: IProps): Object {
  return {
    backgroundColor: "transparent",
    fontSize       : 12,
  };
}

class Button extends React.Component <IProps, IState> {
  state: IState = {
    hovered: false,
  };

  defaultProps: IProps = {
    color     : blackLight,
    hoverColor: blackDark,
  };

  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    const { color, hoverColor, style } = this.props;
    const colorStyle = Object.assign({}, style, {
      color: this.state.hovered ? hoverColor : color,
    });

    const buttonStyle = Object.assign({}, getStyles(this.props), colorStyle);

    return (
      <button className="button"
              style={buttonStyle}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
      >
        {this.props.children}
      </button>
    );
  }

  private handleMouseEnter: React.MouseEventHandler = () => {
    this.setState({ hovered: true });
  };

  private handleMouseLeave: React.MouseEventHandler = () => {
    this.setState({ hovered: false });
  };
}

export { Button }
