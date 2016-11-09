/**
 * Created by sharavan on 08/06/16.
 */
import React from "react";
import { Button } from "../Button/index";
import cx from "classnames";
import BSModal from "react-overlays/lib/Modal";
import styles from "./index.less";

const Modal = ({ style, faName, caption, children, className, show, toggleModal, modalTitle, title }) => {
  const modalStyle = {
    bottom   : 0,
    left     : 0,
    position : "fixed",
    right    : 0,
    top      : 0,
    zIndex   : 1040,
  };
  const dialogStyle = {
    left     : "28%",
    position : "absolute",
    top      : "15%",
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
        backdropClassName={styles.backdrop}
        show={show}
        onHide={toggleModal}
      >
        <div style={dialogStyle} className={cx(styles.base, className)}>
          <div>
            <span className={styles.caption}>{modalTitle || caption}</span>
            <i className={cx("fa fa-times", styles.closeButton)} onClick={toggleModal}/>
          </div>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </BSModal>
    </div>
  );
};

Modal.propTypes = {
  show         : React.PropTypes.bool.isRequired,
  className    : React.PropTypes.string,
  btnClassName : React.PropTypes.string,
  faName       : React.PropTypes.string,
  caption      : React.PropTypes.string,
  toggleModal  : React.PropTypes.func.isRequired,
  children     : React.PropTypes.node.isRequired,
  modalTitle   : React.PropTypes.string,
  title        : React.PropTypes.string,
};

export { Modal };
