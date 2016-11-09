import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, PopupButton } from "components";
import { selectAll, clearSelection, toggleMenuSidebar } from "dataflow/menu/actions";
import styles from "./ContentMenu.less";
import cx from "classnames";

class ContentMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal : false };
    this.toggleModal = this.toggleModal.bind(this);
    this.selectAllHandler = this.selectAllHandler.bind(this);
    this.getActions = this.getActions.bind(this);
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
        <PopupButton label="Actions">{actionsMenuContent}</PopupButton>
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
              faName="sliders"
              onClick={this.props.toggleMenuSidebar}
            />

            <PopupButton label={`${menuStore.selectedKeys.length} selected`}>
              <div onClick={this.selectAllHandler}>Select All</div>
              <div onClick={this.props.clearSelection}>Clear selection</div>
            </PopupButton>
          </span>

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
  className : React.PropTypes.string,
  menuStore : React.PropTypes.any,

  dataKeys : React.PropTypes.array,
  actions  : React.PropTypes.array,

  // Functions
  selectAllRows     : React.PropTypes.func,
  clearSelection    : React.PropTypes.func,
  toggleMenuSidebar : React.PropTypes.func,
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
