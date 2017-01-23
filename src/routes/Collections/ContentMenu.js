import { genReactKey, imap } from "utils";
import React, { Component } from "react";
import { Dropdown } from "components";
import styles from "./ContentMenu.less";
import cx from "classnames";

class ContentMenu extends Component {
  constructor(props) {
    super(props);
    this.state       = { showModal : false };
    this.toggleModal = this.toggleModal.bind(this);
    this.getActions  = this.getActions.bind(this);
  }

  getActions() {
    const { actions, selectedKeys } = this.props;
    const renderAction              = action =>
      <div key={genReactKey(action.name)}
           onClick={(e) => this.handleActionClick(e, selectedKeys, action.handler)}
      >
        {action.name}
      </div>;

    return (
      <span>
        <span className={styles.actionsSeperator}/>
        <Dropdown label=" Actions">{imap(renderAction, actions)}</Dropdown>
      </span>
    );
  }

  handleActionClick(e, selectedKeys, handler) {
    e.preventDefault();
    e.stopPropagation();
    selectedKeys.map(handler);
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({ showModal : false });
    } else {
      this.setState({ showModal : true });
    }
  }

  render() {
    const { selectedKeys } = this.props;

    return (
      <div className={cx("row", styles.navbar)}>
        <div className="col-md-8">
          <div className={styles.menuButtons}>
          <span>
            <Dropdown label={`${selectedKeys.length} selected`}>
              <div onClick={this.props.selectAllRows}>Select All</div>
              <div onClick={this.props.deselectAllRows}>Clear selection</div>
            </Dropdown>
          </span>

            {(selectedKeys.length >= 1) && this.getActions()}
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
  className       : React.PropTypes.string,
  selectedKeys    : React.PropTypes.array,
  actions         : React.PropTypes.object.isRequired,
  // Functions
  selectAllRows   : React.PropTypes.func,
  deselectAllRows : React.PropTypes.func,
};

export { ContentMenu };
