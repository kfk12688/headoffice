import React, { Component } from "react";
import { connect } from "react-redux";
import { Entry, NavLink, StickySidebar, Button, Modal, FavoriteCell } from "components";
import { loadSpec, addRow } from "dataflow/collections/actions";
import styles from "./index.less";
import EditTemplateForm from "../../Forms/NewTemplateForm";

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page      : 1,
      limit     : 30,
      showModal : false,
    };

    this.addRow = this.addRow.bind(this);
  }

  componentWillMount() {
    const { collectionName } = this.props.params;
    this.props.loadSpec(collectionName);
  }

  addRow(rowData) {
    const { collectionName } = this.props.params;
    this.props.addRow(collectionName, rowData);
  }

  render() {
    const { collectionName, templateName="" } = this.props.params;
    const { spec = [], isLoading } = this.props.entryStore[collectionName] || {};

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="row" style={{ marginTop : "1rem" }}>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-12">
                  <h4>{collectionName}</h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <Entry
                    spec={spec}
                    isLoading={isLoading}
                    onSubmit={this.addRow}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <StickySidebar top={150}>
                <div className="row">
                  <div className="col-md-12 btn-group-vertical">
                    <Button><NavLink to="collections">Close View</NavLink></Button>
                    <Button>
                      <NavLink to={`collections/view/${collectionName}`}>Data View</NavLink>
                    </Button>
                  </div>
                </div>
                <div className={styles.divider}/>
                <div className="row">
                  <div className="col-md-12">
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
                    <Button faName="times" block>Delete Template</Button>
                    <Button block>Make Favorite <FavoriteCell value inheritSize/></Button>
                  </div>
                </div>
                <div className={styles.divider}/>
                <div className="row">
                  <div className="col-md-12">
                    <div>Created By :</div>
                    <div>Created At :</div>
                    <div>Last Modified :</div>
                    <div>Belongs to :</div>
                  </div>
                </div>
              </StickySidebar>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EntryForm.propTypes = {
  // route
  params : React.PropTypes.object,

  // state
  entryStore : React.PropTypes.object.isRequired,

  // actions
  loadSpec : React.PropTypes.func,
  addRow   : React.PropTypes.func,
};

const mapStateToProps = state => ({
  entryStore : state.collections,
});

const mapDisptachToProps = dispatch => ({
  loadSpec : (collectionName) => dispatch(loadSpec(collectionName)),
  addRow   : (collectionName, data) => dispatch(addRow(collectionName, data)),
});

export default connect(mapStateToProps, mapDisptachToProps)(EntryForm);
