import React, { Component } from "react";
import moment from "moment";
import cx from "classnames";
import { Modal } from "components";
import FontAwesome from "react-fontawesome";
import styles from "./TitleBar.less";

const MetaInfo = ({ children }) => <span className={styles.metaInfo}>{children}</span>;
MetaInfo.propTypes = {
  children : React.PropTypes.node,
};

export class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal : false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({ showModal : false });
    } else {
      this.setState({ showModal : true });
    }
  }

  render() {
    const { className, title, meta } = this.props;

    return (
      <div className={cx(styles.base, className)}>
        <div className={styles.title}>
          <FontAwesome name="user"/>
          &nbsp;
          {title}
          <Modal
            modalTitle="Edit User's credentials"
            btnClassName={styles.editButton}
            faName="edit"
            show={this.state.showModal}
            toggleModal={this.toggleModal}
          >
            <div>Nothing</div>
          </Modal>
        </div>
        <div className={styles.meta}>
          <span>Created At : <MetaInfo>{moment(meta.createdAt).format("Do MMM, YYYY")}</MetaInfo></span>
          <span>Phone Number : <MetaInfo>{meta.phoneNumber}</MetaInfo></span>
        </div>
      </div>
    );
  }
}

TitleBar.propTypes = {
  className : React.PropTypes.string,
  title     : React.PropTypes.string,
  meta      : React.PropTypes.object,
};
