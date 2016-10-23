import React from "react";
import { TextInput } from "../Inputs";
import Overlay from "../Overlay";
import styles from "./SelectMenuModal.less";

class SelectMenuModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show       : false,
      searchText : "",
    };
    this.ctrls = {};
    this.assignTarget = target => { this.ctrls.target = target; };

    this.setSearchText = this.setSearchText.bind(this);
    this.setSelectedItem = this.setSelectedItem.bind(this);
  }

  setSearchText(e) {
    this.setState({
      show       : true,
      searchText : e.target.value,
    });
  }

  setSelectedItem(e, selectedItem) {
    this.setState({
      show       : true,
      searchText : selectedItem,
    });
  }

  renderFilters() {
    return (
      <div className={styles.filters}>
        <TextInput className={styles.textFilter}/>
      </div>
    );
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <span className={styles.title}>Filter by who’s assigned</span>
        <i className="fa fa-times pull-right"/>
      </div>
    );
  }

  renderList() {
    const text = ["Text Info 01", "Text Info 02 Text Info 02 Text Info 02 ", "Text Info 04", "Text Info 05", "Text Info 06", "Text Info 07"];
    const items = text.map((item, idx) =>
      <div key={idx} className={styles.item} title={item} onClick={e => this.setSelectedItem(e, item)}>
        {item}
      </div>);

    return (<div className={styles.list}>{items}</div>);
  }

  renderBox() {
    return (
      <div className={styles.modal}>
        <div className={styles.content}>
          {/*{this.renderHeader()}*/}
          {/*{this.renderFilters()}*/}
          {this.renderList()}
        </div>
        <div className={styles.loadingOverlay}>
          <i className="fa fa-spinner"/>
        </div>
      </div>
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div className={className} ref={this.assignTarget}>
        <TextInput
          placeholder="Search all issues"
          value={this.state.searchText}
          onChange={this.setSearchText}
        />
        <Overlay
          target={this.ctrls.target}
          show={this.state.show}
          onHide={e => this.setState({ show : false })}
        >
          {this.renderBox()}
        </Overlay>
      </div>
    );
  }
}

SelectMenuModal.propTypes = {
  className   : React.PropTypes.string,
  loadOptions : React.PropTypes.func,
};

export { SelectMenuModal };
