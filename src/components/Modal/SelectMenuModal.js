import React from "react";
import _ from "underscore";
import Overlay from "../Overlay";
import styles from "./SelectMenuModal.less";

class SelectMenuModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show       : false,
      searchText : { id : "dummyID" },
    };
    this.ctrls = {};
    this.assignTarget = target => { this.ctrls.target = target; };

    this.parseInput = this.parseInput.bind(this);
    this.formatInput = this.formatInput.bind(this);

    this.renderList = this.renderList.bind(this);
  }

  parseInput(item) {
    const { input } = this.props;
    input.onChange(item);

    this.setState({
      show       : true,
      searchText : item,
    });

    return JSON.stringify(item);
  }

  formatInput(v) {
    return v && v.label;
  }

  //renderFilters() {
  //  return (
  //    <div className={styles.filters}>
  //      <TextInput className={styles.textFilter}/>
  //    </div>
  //  );
  //}
  //
  //renderHeader() {
  //  return (
  //    <div className={styles.header}>
  //      <span className={styles.title}>Filter by who’s assigned</span>
  //      <i className="fa fa-times pull-right"/>
  //    </div>
  //  );
  //}

  renderList() {
    const { loadOptions } = this.props;

    loadOptions()
      .then(({ options }) => _.map(options, (item, idx) =>
        <div
          key={idx}
          className={styles.item}
          onClick={e => this.parseInput({ id : item.id, label : idx })}
          data-id={item.id}
          data-value={idx}
        >
          {idx}
        </div>
      ))
      .then(content => {
        this.list = <div className={styles.list}>{content}</div>;
      });
  }

  //renderLoader() {
  //  return (
  //    <div className={styles.loadingOverlay}>
  //      <i className="fa fa-spinner"/>
  //    </div>
  //  );
  //}

  renderBox() {
    this.renderList();
    return (
      <div className={styles.modal}>
        <div className={styles.content}>
          {/*{this.renderHeader()}*/}
          {/*{this.renderFilters()}*/}
          {this.list}
        </div>
      </div>
    );
  }

  render() {
    const { className } = this.props;
    const { value } = this.props.input;

    return (
      <div className={className} ref={this.assignTarget}>
        <input
          className={styles.textInputBox}
          value={this.formatInput(value)}
          onChange={e => this.parseInput({ label : e.target.value })}
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
  input       : React.PropTypes.shape({
    value    : React.PropTypes.any.isRequired,
    onChange : React.PropTypes.func.isRequired,
  }),
  className   : React.PropTypes.string,
  loadOptions : React.PropTypes.func,
};

export { SelectMenuModal };
