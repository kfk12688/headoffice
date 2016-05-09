/**
 * Created by RSH on 08.05.2016.
 */

import * as React from "react";
import * as colors from "../../styles/colors";

interface IProps {
  /**
   * Elements passed into the SVG Icon.
   */
  children?: Element;
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
  onMouseLeave?: Function;
  /**
   * Function called when mouse enters this element.
   */
  onMouseEnter?: Function;
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
  other?: {};
}

interface IState {
  /**
   * Describes the mouse hover state on the element
   */
  hovered: boolean;
}

class SvgIcon extends React.Component <IProps, IState> {
  static defaultProps = {
    onMouseEnter: () => {
    },
    onMouseLeave: () => {
    },
    viewBox     : "0 0 24 24",
  };

  state: IState = {
    hovered: false
  };

  constructor ( props: IProps ) {
    super( props );
  }

  handleMouseLeave = ( event ) => {
    this.setState( { hovered: false } );
    this.props.onMouseLeave( event );
  };

  handleMouseEnter = ( event ) =>  {
    this.setState( { hovered: true } );
    this.props.onMouseEnter( event );
  };

  render () {
    const { children, viewBox } = this.props;
    const other = this.props;

    const onColor = this.props.hoverColor ?
                    this.props.hoverColor :
                    colors.fullBlack;
    const offColor = colors.faintBlack;

    const style: React.CSSProperties = {
      display   : "inline-block",
      height    : 22,
      width     : 22,
      userSelect: "none",
      fill      : this.state.hovered ? onColor : offColor,
      position  : "absolute"
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
}

export { SvgIcon }
