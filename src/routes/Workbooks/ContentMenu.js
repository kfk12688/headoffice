import React, { Component } from "react";
import { connect } from "react-redux";
import { selectAll, clearSelection, toggleMenuSidebar } from "dataflow/menu/actions";
import { Button, Modal, Dropdown } from "components";
import NewWorkbookForm from "../Forms/NewWorkbookForm";
import cx from "classnames";
import styles from "./ContentMenu.less";

class ContentMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal : false };
    this.toggleModal = this.toggleModal.bind(this);
    this.selectAllHandler = this.selectAllHandler.bind(this);
  }

  getActions() {
    const { actions } = this.props;
    const actionsMenuContent = actions.map(action => {
      const key = action.name.replace(/ /, "").toLowerCase();
      return <div key={key} onClick={action.handler}>{action.name}</div>;
    });

    return (
      <span>
        <span className={styles.actionsSeperator}/>
        <Dropdown label="Actions">
          {actionsMenuContent}
        </Dropdown>
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
          <span>
            <Button
              isToggled={menuStore.showSidebar}
              faName="sliders"
              onClick={this.props.toggleMenuSidebar}
            />
            <Modal
              modalTitle="Edit Template"
              faName="plus"
              caption="Add New Workbook"
              show={this.state.showModal}
              showModal={e => this.setState({ showModal : true })}
              hideModal={e => this.setState({ showModal : false })}
              style="primary"
            >
              <NewWorkbookForm onSubmit={this.props.createWorkbook} toggleModal={this.toggleModal}/>
            </Modal>
            <Dropdown label={`${menuStore.selectedKeys.length} selected`}>
              <div onClick={this.selectAllHandler}>Select All</div>
              <div onClick={this.props.clearSelection}>Clear selection</div>
            </Dropdown>
          </span>

          {(menuStore.selectedKeys.length > 0) && this.getActions()}
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
  className : React.PropTypes.string,
  menuStore : React.PropTypes.any,  // redux store

  dataKeys : React.PropTypes.array.isRequired,
  actions  : React.PropTypes.array.isRequired,

  selectAllRows     : React.PropTypes.func,
  clearSelection    : React.PropTypes.func,
  toggleMenuSidebar : React.PropTypes.func,
  createWorkbook    : React.PropTypes.func,
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
