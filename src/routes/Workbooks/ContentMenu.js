import React, { Component } from "react";
import { connect } from "react-redux";
import { selectAll, clearSelection, toggleMenuSidebar } from "dataflow/menu/actions";
import { Button, Modal, PopupButton } from "components";
import NewWorkbookForm from "./NewWorkbookForm";
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
        <PopupButton label="Actions">
          {actionsMenuContent}
        </PopupButton>
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
              size="md"
              show={this.state.showModal}
              toggleModal={this.toggleModal}
              caption="Add New Workbook"
              style="primary"
              faName="plus"
            >
              <NewWorkbookForm onSubmit={this.props.addNewWorkbook} toggleModal={this.toggleModal}/>
            </Modal>
            <PopupButton label={`${menuStore.selectedKeys.length} selected`}>
              <div onClick={this.selectAllHandler}>Select All</div>
              <div onClick={this.props.clearSelection}>Clear selection</div>
            </PopupButton>
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
  addNewWorkbook    : React.PropTypes.func,
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
