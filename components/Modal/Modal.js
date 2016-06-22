/**
 * Created by sharavan on 08/06/16.
 */
import React from "react";
import { FormButton } from "../Button/index";
import FontAwesome from "react-fontawesome";
import cx from "classnames";
import BSModal from "react-overlays/lib/Modal";
import styles from "./Modal.less";

class Modal extends React.Component {
  constructor() {
    super();
    this.state = { showModal : false };
  }

  render() {
    const { btnClassName, faName, caption, children, className, accent } = this.props;
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
        <FormButton className={btnClassName} faName={faName} accent={accent}
                    onClick={() => this.setState({ showModal: true })}
        >
           {caption}
        </FormButton>

        <BSModal
          aria-labelledby="modal-label"
          style={modalStyle}
          backdropClassName={styles.backdrop}
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <div style={dialogStyle} className={cx(styles.base, className)}>
            <div>
              <span className={styles.caption}>{caption}</span>
              <FontAwesome name="times" className={styles.closeButton}
                           onClick={() => this.setState({ showModal: false })}/>
            </div>
            <div className={styles.content}>
            {children}
            </div>
          </div>
        </BSModal>
      </span>
    );
  }
}

export { Modal };
