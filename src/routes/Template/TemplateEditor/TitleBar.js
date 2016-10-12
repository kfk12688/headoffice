import React, { Component } from "react";
import moment from "moment";
import cx from "classnames";
import { Modal, FavoriteCell } from "components";
import EditTemplateForm from "../NewTemplateForm";
import styles from "./TitleBar.less";

const MetaInfo = ({ children }) => <span className={styles.metaInfo}>{children}&nbsp;&#8226;&nbsp;</span>;
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
    const { className, editTemplate, store } = this.props;
    const { templateName, createdAt, createdBy, modifiedAt, workBook, isFavorite } = store;

    return (
      <div className={cx(styles.base, className)}>
        <div className={styles.left}>
          <div className={styles.title}>
            <b><u>Template Editor</u> : </b>{templateName}
          </div>

          <div className={styles.owner}>
            <span className={styles.ownerSpan}>By </span>
            <span>{createdBy && createdBy.name}</span>
          </div>

          <div className={styles.meta}>
            <span>Created At : <MetaInfo>{moment(createdAt).format("DD-MM-YYYY")}</MetaInfo></span>
            <span>Last Modified : <MetaInfo>{moment(modifiedAt).format("h:mm A, DD-MM-YYYY")}</MetaInfo></span>
            <span>Belongs to : <MetaInfo>{workBook && workBook.name}</MetaInfo></span>
          </div>
        </div>

        <div className={styles.icons}>
          <Modal
            modalTitle="Edit Template"
            btnClassName={styles.iconsEdit}
            faName="edit"
            show={this.state.showModal}
            toggleModal={this.toggleModal}
          >
            <EditTemplateForm state={store} submitForm={editTemplate} toggleModal={this.toggleModal}/>
          </Modal>

          <FavoriteCell style={{ float : "right" }} value={isFavorite || false} inheritSize/>
        </div>
      </div>
    );
  }
}

TitleBar.propTypes = {
  className    : React.PropTypes.string,
  editTemplate : React.PropTypes.func,
  store        : React.PropTypes.object.isRequired,
};
