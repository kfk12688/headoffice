import React from "react";
import {Button} from "../Button/index";
import cx from "classnames";
import BSModal from "react-overlays/lib/Modal";
import styles from "./index.less";

const Modal = ({btnClassName, faName, caption, children, className, accent, show, toggleModal, modalTitle, title, bordered}) => {
  const modalStyle = {
    bottom: 0,
    left: 0,
    position: "fixed",
    right: 0,
    top: 0,
    zIndex: 1040,
  };

  return (
    <div style={{display: "inline-block"}}>
      <Button
        className={btnClassName}
        faName={faName}
        accent={accent}
        onClick={toggleModal}
        title={title}
        bordered={bordered}
      >
        {caption}
      </Button>

      <BSModal
        aria-labelledby="modal-label"
        style={modalStyle}
        backdropClassName={styles.backdrop}
        show={show}
        onHide={toggleModal}
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <span className={styles.caption}>{modalTitle || caption}</span>
              <i className={cx("fa fa-times", styles.closeButton)} onClick={toggleModal}/>
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
  accent: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  show: React.PropTypes.bool.isRequired,
  className: React.PropTypes.string,
  btnClassName: React.PropTypes.string,
  faName: React.PropTypes.string,
  caption: React.PropTypes.string,
  toggleModal: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
  modalTitle: React.PropTypes.string,
  title: React.PropTypes.string,
  bordered: React.PropTypes.bool,
};

export {Modal};
