/**
 * Created by sharavan on 03/09/16.
 */
import React, { Component } from "react";
import { Modal, Table } from "components";
import styles from "./ModalCell.less";

class ModalCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show : false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      show : !this.state.show,
    });
  }

  render() {
    const { rows, cols, caption } = this.props;

    return (
      <Modal
        accent="indigo"
        title="Click to open"
        caption={caption}
        btnClassName={styles.btnClass}
        show={this.state.show}
        toggleModal={this.toggleModal}
      >
        <Table cols={cols} rows={rows}/>
      </Modal>
    );
  }
}

export { ModalCell };
