import React, { Component } from "react";
import moment from "moment";
import cx from "classnames";
import EditTemplateForm from "../Forms/TemplateForm";
import { Modal, FavoriteCell } from "../../index";
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
    const { className, title, meta, editTemplate } = this.props;

    return (
      <div className={cx(styles.base, className)}>
        <div className={styles.title}>
          <FavoriteCell value={meta.favorite} inheritSize/>
          &nbsp;
          {title}
          <Modal
            modalTitle="Edit Template"
            btnClassName={styles.editButton}
            faName="edit"
            show={this.state.showModal}
            toggleModal={this.toggleModal}
          >
            <EditTemplateForm submitForm={editTemplate} toggleModal={this.toggleModal}/>
          </Modal>
        </div>
        <div className={styles.meta}>
          <span>Created At : <MetaInfo>{moment(meta.createdAt).format("Do MMM, YYYY")}</MetaInfo></span>
          <span>Is a favorite : <MetaInfo>{meta.favorite ? "Yes" : "No"}</MetaInfo></span>
        </div>
      </div>
    );
  }
}

TitleBar.propTypes = {
  className : React.PropTypes.string,
  title     : React.PropTypes.string,
  meta      : React.PropTypes.object,
  editTemplate : React.PropTypes.func,
};
