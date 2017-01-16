import R from "ramda";
import cx from "classnames";
import React, { Component } from "react";
import { Modal, Dropdown } from "components";
import { NewTemplateForm } from "forms";
import styles from "./ContentMenu.less";

class ContentMenu extends Component {
  constructor(props) {
    super(props);
    this.state       = { showModal : false };
    this.toggleModal = this.toggleModal.bind(this);
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
    const len = R.length(this.props.selectedKeys);

    return (
      <div className={cx("row", styles.navbar)}>
        <div className="col-md-8">
          <div className={styles.menuButtons}>
            <Modal
              modalTitle="Create a new Template"
              faName="plus"
              caption="Add New Content"
              show={this.state.showModal}
              showModal={e => this.setState({ showModal : true })}
              hideModal={e => this.setState({ showModal : false })}
              style="primary"
            >
              <NewTemplateForm onSubmit={this.props.createTemplate} toggleModal={this.toggleModal}/>
            </Modal>

            <Dropdown label={`${len} selected`}>
              <div onClick={this.props.selectAllRows}>Select All</div>
              <div onClick={this.props.deselectAllRows}>Clear selection</div>
            </Dropdown>

            {(len >= 1) && this.getActions()}
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
  selectedKeys    : React.PropTypes.array,
  actions         : React.PropTypes.object,
  // Functions
  selectAllRows   : React.PropTypes.func,
  deselectAllRows : React.PropTypes.func,
  createTemplate  : React.PropTypes.func,
};

export { ContentMenu };
