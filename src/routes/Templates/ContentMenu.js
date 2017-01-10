import cx from "classnames";
import { connect } from "react-redux";
import styles from "./ContentMenu.less";
import React, { Component } from "react";
import { Button, Modal, Dropdown } from "components";
import CreateTemplateForm from "../Forms/NewTemplateForm";
import { selectAll, clearSelection, toggleMenuSidebar } from "dataflow/templates/actions";

class ContentMenu extends Component {
  constructor(props) {
    super(props);
    this.state            = { showModal : false };
    this.toggleModal      = this.toggleModal.bind(this);
    this.selectAllHandler = this.selectAllHandler.bind(this);
  }

  getActions() {
    const { actions }        = this.props;
    const actionsMenuContent = actions.map(action => {
      const key = action.name.replace(/ /, "").toLowerCase();
      return <div key={key} onClick={action.handler}>{action.name}</div>;
    });

    return (
      <span>
      <span className={styles.actionsSeperator}/>
      <Dropdown label=" &nbsp; Actions">{actionsMenuContent}</Dropdown>
      </span>
    );
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({ showModal : false });
    } else {
      this.setState({ showModal : true });
    }
  }

  selectAllHandler() {
    this.props.selectAllRows(this.props.dataKeys);
  }

  render() {
    const { menuStore } = this.props;

    return (
      <div className={cx("row", styles.navbar)}>
        <div className="col-md-8">
          <div className={styles.menuButtons}>
            <Button
              isToggled={menuStore.showSidebar}
              faName="sliders"
              onClick={this.props.toggleMenuSidebar}
            />

            <Modal
              modalTitle="Create a new Template"
              faName="plus"
              caption="Add New Content"
              show={this.state.showModal}
              showModal={e => this.setState({ showModal : true })}
              hideModal={e => this.setState({ showModal : false })}
              style="primary"
            >
              <CreateTemplateForm onSubmit={this.props.createTemplate} toggleModal={this.toggleModal}/>
            </Modal>

            <Dropdown label={`${menuStore.selectedKeys.length} selected`}>
              <div onClick={this.selectAllHandler}>Select All</div>
              <div onClick={this.props.clearSelection}>Clear selection</div>
            </Dropdown>

            {(menuStore.selectedKeys.length >= 1) && this.getActions()}
          </div>
        </div>

        <div className="col-md-4">
          <div>Sort by :</div>
        </div>
      </div>
    );
  }
}

ContentMenu.propTypes = {
  menuStore : React.PropTypes.any,

  dataKeys : React.PropTypes.array,
  actions  : React.PropTypes.array,

  // Functions
  selectAllRows     : React.PropTypes.func,
  clearSelection    : React.PropTypes.func,
  toggleMenuSidebar : React.PropTypes.func,
  createTemplate    : React.PropTypes.func,
};

const menu = connect(
  state => ({
    menuStore : state.menu,
  }),
  dispatch => ({
    selectAllRows     : (keys) => dispatch(selectAll(keys)),
    clearSelection    : () => dispatch(clearSelection()),
    toggleMenuSidebar : () => dispatch(toggleMenuSidebar()),
  })
)(ContentMenu);

export { menu as ContentMenu };
