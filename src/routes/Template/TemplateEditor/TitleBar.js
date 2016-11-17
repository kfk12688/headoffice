import React, { Component } from "react";
import moment from "moment";
import { Modal, FavoriteCell } from "components";
import EditTemplateForm from "../../Forms/NewTemplateForm";

const MetaInfo = ({ children }) => <span className="text-muted">{children}&nbsp;&#8226;&nbsp;</span>;
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
      <div className={className}>
        <div className="col-md-10">
          <div>
            <b><u>Template Editor</u> : </b>{templateName}
          </div>

          <div>
            <span>By </span>
            <span>{createdBy && createdBy.name}</span>
          </div>

          <div>
            <span>Created At : <MetaInfo>{moment(createdAt).format("DD-MM-YYYY")}</MetaInfo></span>
            <span>Last Modified : <MetaInfo>{moment(modifiedAt).format("h:mm A, DD-MM-YYYY")}</MetaInfo></span>
            <span>Belongs to : <MetaInfo>{workBook && workBook.name}</MetaInfo></span>
          </div>
        </div>

        <div className="col-md-2">
          <Modal
            modalTitle="Edit Template"
            faName="edit"
            show={this.state.showModal}
            toggleModal={this.toggleModal}
          >
            <EditTemplateForm state={store} submitForm={editTemplate} toggleModal={this.toggleModal}/>
          </Modal>

          <FavoriteCell value={isFavorite || false} inheritSize/>
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
