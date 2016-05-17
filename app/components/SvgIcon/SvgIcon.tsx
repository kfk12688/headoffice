/**
 * Created by RSH on 08.05.2016.
 */

import * as React from "react";
import * as colors from "../internal/styles/colors";

interface IProps {
  /**
   * Elements passed into the SVG Icon.
   */
  children?: React.ReactNode;
  /**
   * This is the fill color of the svg icon.
   * If not specified, this component will default
   * to muiTheme.palette.textColor.
   */
  color?: string;
  /**
   * This is the icon color when the mouse hovers over the icon.
   */
  hoverColor?: string;
  /**
   * Function called when mouse enters this element.
   */
  /**
   * Function called when mouse leaves this element.
   */
  onMouseLeave?: (event?: React.SyntheticEvent) => void;
  /**
   * Function called when mouse enters this element.
   */
  onMouseEnter?: (event?: React.SyntheticEvent) => void;
  /**
   * Allows you to redifine what the coordinates
   * without units mean inside an svg element. For example,
   * if the SVG element is 500 (width) by 200 (height), and you
   * pass viewBox="0 0 50 20", this means that the coordinates inside
   * the svg will go from the top left corner (0,0) to bottom right (50,20)
   * and each unit will be worth 10px.
   */
  viewBox?: string;
  // fixme: To be changed/analysed better
  other?: any;
}

interface IState {
  /**
   * Describes the mouse hover state on the element
   */
  hovered: boolean;
}

class SvgIcon extends React.Component <IProps, IState> {
  static defaultProps: IProps = {
    viewBox     : "0 0 24 24",
  };

  state: IState = {
    hovered: false,
  };

  constructor(props: IProps) {
    super(props);
  }

  render(): JSX.Element {
    const {children, viewBox} = this.props;
    const other = this.props;
    const onColor = this.props.hoverColor ?
      this.props.hoverColor :
      colors.blackDark;
    const offColor = this.props.color ?
      this.props.color :
      colors.blackLight;

    const style = {
      display   : "inline-block",
      fill      : this.state.hovered ? onColor : offColor,
      height    : 24,
      position  : "absolute",
      userSelect: "none",
      width     : 24,
    };

    return (
      <svg
        style={style}
        {...other}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        viewBox={viewBox}
      >
        {children}
      </svg>
    );
  }

  private handleMouseLeave: Function = (event: React.MouseEvent) => {
    this.setState({hovered: false});
    this.props.onMouseLeave(event);
  };

  private handleMouseEnter: Function = (event: React.MouseEvent) => {
    this.setState({hovered: true});
    this.props.onMouseEnter(event);
  };
}

export {SvgIcon}
