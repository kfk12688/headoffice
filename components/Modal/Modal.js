/**
 * Created by sharavan on 08/06/16.
 */
import React from "react";
import { FormButton } from "../Button/index";
import FontAwesome from "react-fontawesome";
import cx from "classnames";
import BSModal from "react-overlays/lib/Modal";
import styles from "./Modal.less";

const Modal = ({ btnClassName, faName, caption, children, className, accent, show, toggleModal, modalTitle }) => {
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
    <span>
      <FormButton
        className={btnClassName}
        faName={faName}
        accent={accent}
        onClick={toggleModal}
      >
         {caption}
      </FormButton>

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
            <FontAwesome
              name="times"
              className={styles.closeButton}
              onClick={toggleModal}
            />
          </div>
          <div className={styles.content}>
          {children}
          </div>
        </div>
      </BSModal>
    </span>
  );
};

Modal.propTypes = {
  accent       : React.PropTypes.bool,
  show         : React.PropTypes.bool.isRequired,
  className    : React.PropTypes.string,
  btnClassName : React.PropTypes.string,
  faName       : React.PropTypes.string,
  caption      : React.PropTypes.string,
  toggleModal  : React.PropTypes.func.isRequired,
  children     : React.PropTypes.node.isRequired,
  modalTitle   : React.PropTypes.string,
};

export { Modal };
