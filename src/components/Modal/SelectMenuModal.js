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
      options    : [],
    };
    this.ctrls = {};
    this.assignTarget = target => { this.ctrls.target = target; };

    this.parseInput = this.parseInput.bind(this);
    this.formatInput = this.formatInput.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
  }

  componentDidMount() {
    this.loadOptions("");
  }

  parseInput(item) {
    const { input } = this.props;
    const queryText = item.label;
    input.onChange(item);

    this.setState({
      show       : true,
      searchText : item,
    });

    this.loadOptions(queryText);

    return JSON.stringify(item);
  }

  formatInput(v) {
    return v && v.label;
  }

  loadOptions(text) {
    const { loadOptions } = this.props;

    loadOptions(text)
      .then(options => {
        const content = _.map(options, (item, idx) =>
          <div
            key={idx}
            className={styles.item}
            onClick={e => this.parseInput({ id : item.id, label : item.label })}
            data-id={item.id}
            data-value={item.label}
          >
            {item.label}
          </div>
        );

        this.setState({
          options : content,
        });
      });
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
          {
            <div className={styles.modal}>
              <div className={styles.content}>
                <div className={styles.list}>{this.state.options}</div>
              </div>
            </div>
          }
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
