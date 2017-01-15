import R from "ramda";
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
    const renderAction              = action => {
      const key = R.pipe(R.replace(/ /, ""), R.toLower(action.name));
      return <div key={key} onClick={() => R.map(action.handler, selectedKeys)}>{action.name}</div>;
    };
    const actionsMenuContent        = R.compose(R.values, R.map(renderAction))(actions);

    return (
      <span>
        <span className={styles.actionsSeperator}/>
        <Dropdown label=" Actions">{actionsMenuContent}</Dropdown>
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
  actions         : React.PropTypes.array,
  // Functions
  selectAllRows   : React.PropTypes.func,
  deselectAllRows : React.PropTypes.func,
};

export { ContentMenu };
