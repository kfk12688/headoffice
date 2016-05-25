/**
 * Created by sharavan on 21/05/16.
 */

import * as React from "react";
import { Divider, SearchBox } from "../index";
import "font-awesome-webpack";
import "./Popup.less";
let Overlay          = require("react-overlays/lib/Overlay");
let FontAwesome: any = require("react-fontawesome");
let classnames: any  = require("classnames");

interface IProps {
  matchParentWidth?: boolean;
}
interface IState {
  hovered?: boolean;
  showPopup?: boolean;
  width?: number | string;
}

class PopupSearchBox extends React.Component <IProps, IState> {
  state: IState = {
    hovered  : false,
    showPopup: false,
    width: "auto",
  };

  popupMenuStyle: any             = undefined;

  componentDidMount(): void {
    if (this.props.matchParentWidth) {
      this.popupMenuStyle = Object.assign({}, { width: this.refs.target.getBoundingClientRect().width }, this.props.childrenStyle);
    } else {
      this.popupMenuStyle = Object.assign({}, this.props.childrenStyle);
    }
  }

  render(): JSX.Element {
    return (
      <div
        tabIndex="0"
        ref="target"
        className="ho-popup-search-box"
        onClick={this.handleClick}
        onMouseEnter={() => this.setState({ hovered : true })}
        onMouseLeave={() => this.setState({ hovered : false })}
      >
        {this.props.children}
        <Divider
          vertical
          className={
            classnames("ho-popup-search-box-divider", {"ho-popup-search-box-divider-hovered" : this.state.hovered})
          }
          size={{h:"auto", w:1}}
        />
        <FontAwesome
          className="ho-popup-search-box-fa-icon"
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
          <div className="ho-popup-search-box-menu" style={this.popupMenuStyle}>
            <SearchBox placeHolder/>
          </div>
        </Overlay>
      </div>
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

export { PopupSearchBox }
