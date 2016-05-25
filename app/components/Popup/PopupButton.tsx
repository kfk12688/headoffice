/**
 * Created by sharavan on 21/05/16.
 */

import * as React from "react";
import "font-awesome-webpack";
import "./Popup.less";
let Overlay          = require("react-overlays/lib/Overlay");
let FontAwesome: any = require("react-fontawesome");
let classnames: any  = require("classnames");

interface IProps {
  label: string;
  childrenStyle?: any;
}
interface IState {
  hovered?: boolean;
  showPopup?: boolean;
}

class PopupButton extends React.Component <IProps, IState> {
  state: IState = {
    hovered  : false,
    showPopup: false,
  };

  childrenStyle: any              = undefined;
  popupMenuStyle: any             = undefined;
  popupMenuItems: React.ReactNode = undefined;

  componentDidMount(): void {
    if (this.props.childrenStyle) {
      if (typeof this.props.childrenStyle === "string") {
        this.childrenStyle = this.props.childrenStyle;
      }
    } else {
      this.popupMenuStyle = Object.assign({}, this.props.childrenStyle);
    }

    this.popupMenuItems = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        className: classnames(this.childrenStyle, {
          "ho-popup-button-menu-item": !this.props.childrenStyle,
        }),
      });
    });
  }

  render(): JSX.Element {
    return (
      <span
        tabIndex="0"
        ref="target"
        className="ho-popup-button"
        onClick={this.handleClick}
        onMouseEnter={() => this.setState({ hovered : true })}
        onMouseLeave={() => this.setState({ hovered : false })}
      >
        <span>
          {this.props.label}
        </span>
        <FontAwesome
          className="ho-popup-button-fa-icon"
          name="caret-down"
        />

        <Overlay
          rootClose
          show={this.state.showPopup}
          onHide={() => this.setState({ showPopup: false })}
          placement="bottom"
          container={() => this.refs.popupContainer}
          target={ () => this.refs.target}
        >
          <div className="ho-popup-button-menu">
            {this.popupMenuItems}
          </div>
        </Overlay>
      </span>
    );
  }

  private handleClick: Function = () => {
    if (this.state.showPopup) {
      this.setState({ showPopup: false });
    } else {
      this.setState({ showPopup: true });
    }
  }
}

export { PopupButton }
