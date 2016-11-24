import React, { Component } from "react";
import { connect } from "react-redux";
import { StickyContainer, Sticky } from "react-sticky";
import { Link } from "react-router";
import moment from "moment";
import { Entry, Button, Modal, FavoriteCell } from "components";
import { loadSpec, addRow, deleteTemplate, starTemplate, updateTemplate } from "dataflow/collections/actions";
import styles from "./index.less";
import EditTemplateForm from "../../Forms/EditTemplateForm";

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page      : 1,
      limit     : 30,
      showModal : false,
    };

    this.addRow = this.addRow.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
    this.updateTemplate = this.updateTemplate.bind(this);
    this.starTemplate = this.starTemplate.bind(this);
  }

  componentWillMount() {
    const { collectionName } = this.props.params;
    this.props.loadSpec(collectionName);
  }

  addRow(rowData) {
    const { collectionName } = this.props.params;
    this.props.addRow(collectionName, rowData);
  }

  deleteTemplate(e) {
    e.preventDefault();
    const confirmationFlag = window.confirm("Are you sure you want to delete this template?");
    if (confirmationFlag) {
      const { collectionName } = this.props.params;
      this.props.deleteTemplate(collectionName).then(this.context.router.push("/templates"));
    }
  }

  starTemplate(e) {
    e.preventDefault();
    const { collectionName } = this.props.params;
    this.props.starTemplate(collectionName);
  }

  updateTemplate(data) {
    const { collectionName } = this.props.params;
    this.props.updateTemplate(collectionName, data);
  }

  render() {
    const { collectionName } = this.props.params;
    const {
      userSchema = [], isLoading, templateName = "",
      workbook, modifiedAt, createdAt, createdBy, isFavorite,
    } = this.props.entryStore[collectionName] || {};
    const workbookName = !!workbook && !!workbook.name && workbook.name || "";
    const createdByUser = !!createdBy && !!createdBy.name && createdBy.name || "";

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <StickyContainer>
            <div className="row" style={{ marginTop : "1rem" }}>
              <div className="col-md-9">
                <Sticky stickyStyle={{ backgroundColor : "white", zIndex : 100 }}>
                  <div className="row">
                    <div className="col-md-12">
                      <h4>{templateName}</h4>
                    </div>
                  </div>
                </Sticky>

                <div className="row">
                  <div className="col-md-12">
                    <Entry
                      spec={userSchema}
                      isLoading={isLoading}
                      onSubmit={this.addRow}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <Sticky stickyStyle={{ paddingTop : 8 }}>
                  <div className="btn-group-vertical btn-block">
                    <Link to={`templates/${collectionName}`} className="btn btn-secondary btn-sm" role="button">
                      Edit Schema&nbsp;<i className="fa fa-edit"/>
                    </Link>
                    <Link to="collections" className="btn btn-secondary btn-sm" role="button">
                      Close View&nbsp;<i className="fa fa-times-circle-o"/>
                    </Link>
                    <Link to={`collections/view/${collectionName}`} className="btn btn-secondary btn-sm" role="button">
                      View entered data&nbsp;<i className="fa fa-arrow-circle-o-right"/>
                    </Link>
                  </div>

                  <div className={styles.divider}/>
                  <Modal
                    modalTitle="Edit Template"
                    faName="edit"
                    caption="Edit Template"
                    show={this.state.showModal}
                    showModal={e => this.setState({ showModal : true })}
                    hideModal={e => this.setState({ showModal : false })}
                    block
                  >
                    <EditTemplateForm
                      state={{}} submitForm={() => {}}
                      toggleModal={e => this.setState({ showModal : false })}
                    />
                  </Modal>
                  <Button faName="times" block onClick={this.deleteTemplate}>Delete Template</Button>
                  <Button block onClick={this.starTemplate}>
                    Make Favorite
                    &nbsp;
                    <FavoriteCell value={isFavorite || false} inheritSize/>
                  </Button>

                  <div className={styles.divider}/>
                  <div className={styles.attributes}>
                    <div>Created By : <span>{createdByUser}</span></div>
                    <div>Created At : <span>{moment(createdAt).format("DD-MM-YYYY")}</span></div>
                    <div>Last Modified : <span>{moment(modifiedAt).format("DD-MM-YY h:m A")}</span></div>
                    <div>Belongs to : <span>{workbookName}</span></div>
                  </div>
                </Sticky>
              </div>
            </div>
          </StickyContainer>
        </div>
      </div>
    );
  }
}

EntryForm.propTypes = {
  // route
  params         : React.PropTypes.object,
  // state
  entryStore     : React.PropTypes.object.isRequired,
  // actions
  loadSpec       : React.PropTypes.func,
  addRow         : React.PropTypes.func,
  deleteTemplate : React.PropTypes.func.isRequired,
  starTemplate   : React.PropTypes.func.isRequired,
  updateTemplate : React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entryStore : state.collections,
});

const mapDisptachToProps = dispatch => ({
  loadSpec       : (collectionName) => dispatch(loadSpec(collectionName)),
  addRow         : (collectionName, data) => dispatch(addRow(collectionName, data)),
  deleteTemplate : collectionName => dispatch(deleteTemplate(collectionName)),
  starTemplate   : collectionName => dispatch(starTemplate(collectionName)),
  updateTemplate : (collectionName, data) => dispatch(updateTemplate(collectionName, data)),
});

export default connect(mapStateToProps, mapDisptachToProps)(EntryForm);
