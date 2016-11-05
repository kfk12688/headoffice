import React, {Component} from "react";
import {connect} from "react-redux";
import {selectAll, clearSelection, toggleMenuSidebar} from "dataflow/menu/actions";
import {Button, Modal, PopupButton} from "components";
import CreateTemplateForm from "./NewTemplateForm";
import styles from "./ContentMenu.less";
import cx from "classnames";

class ContentMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
    this.toggleModal = this.toggleModal.bind(this);
    this.selectAllHandler = this.selectAllHandler.bind(this);
  }

  getActions() {
    const {actions} = this.props;
    const actionsMenuContent = actions.map(action => {
      const key = action.name.replace(/ /, "").toLowerCase();
      return <div key={key} onClick={action.handler}>{action.name}</div>;
    });

    return (
      <span>
        <span className={styles.actionsSeperator}/>
        <PopupButton label="Actions">{actionsMenuContent}</PopupButton>
      </span>
    );
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({showModal: false});
    } else {
      this.setState({showModal: true});
    }
  }

  selectAllHandler() {
    this.props.selectAllRows(this.props.dataKeys);
  }

  render() {
    const {className, menuStore} = this.props;

    return (
      <nav
        className={cx("navbar navbar-default",styles.navbar)}
      >
        <span className={styles.left}>
            <Button
              faName="sliders"
              onClick={this.props.toggleMenuSidebar}
              className={cx(styles.icon, {[styles.iconActive]: menuStore.showSidebar})}
            />

            <Modal
              show={this.state.showModal}
              toggleModal={this.toggleModal}
              caption="Add New Content"
              faName="plus"
              accent
            >
              <CreateTemplateForm onSubmit={this.props.addTemplate} toggleModal={this.toggleModal}/>
            </Modal>

            <PopupButton label={`${menuStore.selectedKeys.length} selected`}>
              <div onClick={this.selectAllHandler}>Select All</div>
              <div onClick={this.props.clearSelection}>Clear selection</div>
            </PopupButton>

          {(menuStore.selectedKeys.length >= 1) && this.getActions()}
        </span>
        <span className={styles.right}>
          <span className={styles.sortTitle}>Sort by : </span>
        </span>
      </nav>
    );
  }
}

ContentMenu.propTypes = {
  className: React.PropTypes.string,
  menuStore: React.PropTypes.any,

  dataKeys: React.PropTypes.array,
  actions: React.PropTypes.array,

  // Functions
  selectAllRows: React.PropTypes.func,
  clearSelection: React.PropTypes.func,
  toggleMenuSidebar: React.PropTypes.func,
  addTemplate: React.PropTypes.func,
};

const menu = connect(
  state => ({
    menuStore: state.menu,
  }),
  dispatch => ({
    selectAllRows: (keys) => dispatch(selectAll(keys)),
    clearSelection: () => dispatch(clearSelection()),
    toggleMenuSidebar: () => dispatch(toggleMenuSidebar()),
  })
)(ContentMenu);

export {menu as ContentMenu};
