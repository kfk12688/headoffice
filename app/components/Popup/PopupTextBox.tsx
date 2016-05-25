/**
 * Created by sharavan on 21/05/16.
 */

import * as React from "react";
import { Divider } from "../index";
import "font-awesome-webpack";
import "./Popup.less";
let Overlay          = require("react-overlays/lib/Overlay");
let FontAwesome: any = require("react-fontawesome");
let classnames: any  = require("classnames");

interface IProps {
  childrenStyle?: string;
  matchParentWidth?: boolean;
  label: string;
}
interface IState {
  hovered?: boolean;
  label?: string;
  showPopup?: boolean;
}

class PopupTextBox extends React.Component <IProps, IState> {
  ctrls: {
    target?: HTMLElement,
  } = {};

  state: IState = {
    hovered  : false,
    label    : this.props.label,
    showPopup: false,
  };

  childrenStyle: any              = undefined;
  popupMenuStyle: any             = undefined;
  popupMenuItems: React.ReactNode = undefined;

  componentDidMount(): void {
    if (this.props.matchParentWidth) {
      this.popupMenuStyle = Object.assign({}, { width: this.ctrls.target.getBoundingClientRect().width }, this.props.childrenStyle);
    } else {
      this.popupMenuStyle = Object.assign({}, this.props.childrenStyle);
    }

    if (this.props.childrenStyle) {
      if (typeof this.props.childrenStyle === "string") {
        this.childrenStyle = this.props.childrenStyle;
      }
    }
    this.popupMenuItems = React.Children.map(this.props.children, (child: React.ReactElement<any>, index: number) => {
      return React.cloneElement(child, {
        className: classnames(this.childrenStyle, {
          "ho-popup-text-box-menu-item": !this.props.childrenStyle,
        }),
        key : index,
        onClick: this.handlePopupMenuClick,
      });
    });
  }

  render(): JSX.Element {
    return (
      <div
        tabIndex="0"
        ref={this.assignTarget}
        className="ho-popup-text-box"
        onClick={this.handleClick}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        >
        <span>
          {this.state.label}
        </span>
      <Divider
        vertical
        className={
            classnames("ho-popup-text-box-divider", {"ho-popup-text-box-divider-hovered" : this.state.hovered})
          }
        size={{h:"auto", w:1}}
      />
      <FontAwesome className="ho-popup-text-box-fa-icon" name="caret-down"/>

      <Overlay
        rootClose
        show={this.state.showPopup}
        onHide={() => this.setState({ showPopup: false })}
        placement="bottom"
        target={ () => this.ctrls.target}
      >
        <div className="ho-popup-text-box-menu" style={this.popupMenuStyle}>
          {this.popupMenuItems}
        </div>
      </Overlay>
      </div>
    );
  }

  private assignTarget: Function = (target: HTMLElement) => this.ctrls.target = target;

  private handleClick: Function = () => {
    if (this.state.showPopup) {
      this.setState({ showPopup: false });
    } else {
      this.setState({ showPopup: true });
    }
  }

  private handlePopupMenuClick: Function = (e: React.MouseEvent) => {
    // fixme : anti-pattern
    let target: any = e.target;
    e.preventDefault();
    this.setState({
      label: target.innerHTML,
      showPopup : false,
    });
  }
}

export { PopupTextBox }
