/**
 * Created by sharavan on 21/05/16.
 */
import * as React from "react";
import "font-awesome-webpack";
import "./Popup.less";
let Overlay          = require("react-overlays/lib/Overlay")
let FontAwesome: any = require("react-fontawesome")
let classnames: any  = require("classnames")

interface IProps {
  childrenStyle?: string
  matchParentWidth?: boolean
  label: string
}

interface IState {
  showPopup?: boolean
}

class PopupTextBox extends React.Component <IProps, IState> {
  ctrls: {
    target?: HTMLElement,
  } = {}

  state: IState = { showPopup: false }

  childrenStyle: any              = undefined
  popupMenuStyle: any             = undefined
  popupMenuItems: React.ReactNode = undefined

  componentDidMount(): void {
    if (this.props.matchParentWidth) {
      this.popupMenuStyle = Object.assign({}, { width: this.ctrls.target.getBoundingClientRect().width }, this.props.childrenStyle)
    } else {
      this.popupMenuStyle = Object.assign({}, this.props.childrenStyle)
    }

    if (this.props.childrenStyle) {
      if (typeof this.props.childrenStyle === "string") {
        this.childrenStyle = this.props.childrenStyle
      }
    }

    this.popupMenuItems = React.Children.map(this.props.children, (child: React.ReactElement<any>, index: number) => {
      return React.cloneElement(child, {
        className: classnames(this.childrenStyle, {
          "ho-popup-text-box-menu-item": !this.props.childrenStyle,
        }),
        key      : index,
        onClick  : this.handlePopupMenuClick.bind(this, child.props.callBack),
      })
    })
  }

  render(): JSX.Element {
    return (
      <div
        tabIndex="0"
        ref={this.assignTarget}
        onClick={this.handleClick}
        className="ho-popup-text-box"
      >
        <span className="input">{this.props.label}</span>
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
    )
  }

  private assignTarget: Function = (target: HTMLElement) => this.ctrls.target = target

  private handleClick: Function = () => {
    if (this.state.showPopup) {
      this.setState({ showPopup: false })
    } else {
      this.setState({ showPopup: true })
    }
  }

  private handlePopupMenuClick: Function = (cb: Function, e: React.MouseEvent) => {
    this.setState({ showPopup: false })
    if (cb !== undefined) {
      cb(e)
    }
  }
}

export { PopupTextBox }
