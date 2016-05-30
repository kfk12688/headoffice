/**
 * Created by sharavan on 08/06/16.
 */
import * as React from "react";
import { Button } from "../Button";
import "./Modal.less";
import "font-awesome-webpack";
const FontAwesome = require("react-fontawesome");
const BSModal = require("react-overlays/lib/Modal");
const cx: any          = require("classnames");

interface IProps {
  className?: string;
  btnClassName?: string;
  faName?: string;
  caption?: any;
}

interface IState {
  showModal: boolean;
}

class Modal extends React.Component <IProps, IState> {
  state: IState = {
    showModal: false,
  };

  render(): JSX.Element {
    const { btnClassName, faName, caption, children, className } = this.props;

    const modalStyle = {
      bottom  : 0,
      left    : 0,
      position: "fixed",
      right   : 0,
      top     : 0,
      zIndex  : 1040,
    };

    const dialogStyle = {
      left    : "28%",
      position: "absolute",
      top     : "15%",
    };

    return (
      <span>
        <Button className={btnClassName} faName={faName} onClick={() => this.setState({ showModal: true })}>
           {caption}
        </Button>

        <BSModal
          aria-labelledby="modal-label"
          style={modalStyle}
          backdropClassName="ho-modal-backdrop"
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <div style={dialogStyle} className={cx("ho-modal", className)}>
            <div>
              <span className="caption">{caption}</span>
              <FontAwesome name="times" className="times" onClick={() => this.setState({showModal: false})}/>
            </div>
            <div className="content">
            {children}
            </div>
          </div>
        </BSModal>
      </span>
    );
  }
}

export { Modal }
