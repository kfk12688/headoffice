/**
 * Created by sharavan on 21/05/16.
 */

import * as React from "react";
import "font-awesome-webpack";
import { Divider } from "../index";
import { DatePicker } from "../DatePicker";
import "./Popup.less";
let FontAwesome: any = require("react-fontawesome");
let classnames: any = require("classnames");

interface IState {
  hovered: boolean;
}

class PopupDatePicker extends React.Component<{}, IState> {
  state: IState = {
    hovered: false,
  };

  render(): JSX.Element {
    return (
      <div
        tabIndex="0"
        className="ho-popup-text-box"
        onMouseEnter={() => this.setState({ hovered : true })}
        onMouseLeave={() => this.setState({ hovered : false })}
      >
        <Divider
          vertical
          className={
            classnames("ho-popup-text-box-divider", {"ho-popup-text-box-divider-hovered" : this.state.hovered})
          }
          size={{h:"auto", w:1}}
        />
        <FontAwesome
          className="ho-popup-text-box-fa-icon"
          name="caret-down"
        />
        <DatePicker/>
      </div>
    );
  }
}

export { PopupDatePicker }
