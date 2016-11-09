import React from "react";
import { Button } from "../Button/index";
import cx from "classnames";
import BSModal from "react-overlays/lib/Modal";
import { grey900 } from "../_styles/colors";

const Modal = ({ size, style, faName, caption, children, show, toggleModal, modalTitle, title }) => {
  const modalStyle = {
    bottom   : 0,
    left     : 0,
    position : "fixed",
    right    : 0,
    top      : 0,
    zIndex   : 1040,
  };

  const backdropStyle = {
    ...modalStyle,
    zIndex          : 0,
    backgroundColor : grey900,
    opacity         : 0.5,
  };

  return (
    <div style={{ display : "inline-block" }}>
      <Button
        faName={faName}
        onClick={toggleModal}
        title={title}
        style={style}
      >
        {caption}
      </Button>

      <BSModal
        aria-labelledby="modal-label"
        style={modalStyle}
        backdropStyle={backdropStyle}
        show={show}
        onHide={toggleModal}
      >
        <div className={cx("modal-dialog", `modal-${size}`)}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={toggleModal}><span>&times;</span></button>
              <h5 className="modal-title">{modalTitle || caption}</h5>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </BSModal>
    </div>
  );
};

Modal.propTypes = {
  show         : React.PropTypes.bool.isRequired,
  size         : React.PropTypes.string,
  style         : React.PropTypes.string,
  faName       : React.PropTypes.string,
  caption      : React.PropTypes.string,
  toggleModal  : React.PropTypes.func.isRequired,
  children     : React.PropTypes.node.isRequired,
  modalTitle   : React.PropTypes.string,
  title        : React.PropTypes.string,
};

export { Modal };
