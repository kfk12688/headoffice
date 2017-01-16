import { imap } from "utils";
import React from "react";
import Overlay from "../Overlay";
import fetch from "dataflow/fetchWrapper";

class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state        = {
      show       : false,
      searchText : { id : "dummyID" },
      options    : [],
    };
    this.ctrls        = {};
    this.assignTarget = target => { this.ctrls.target = target; };

    this.parseInput  = this.parseInput.bind(this);
    this.formatInput = this.formatInput.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
  }

  componentDidMount() {
    this.loadOptions("");
  }

  componentWillUnmount() {
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
    const { api }         = this.props;
    const transformToDivs = (item, idx) => <div key={idx}
                                                className="dropdown-item"
                                                onClick={e => this.parseInput({ id : item.id, label : item.label })}
                                                data-id={item.id}
                                                data-value={item.label}>
      {item.label}
    </div>;

    fetch("GET", api)
      .then(res => res.json())
      .then(options => {
        const content = imap(transformToDivs, options);
        this.setState({ options : content });
      });
  }

  render() {
    const { className } = this.props;
    const { value }     = this.props.input;

    return (
      <div className={className} ref={this.assignTarget}>
        <input className="form-control"
               placeholder="Search..."
               value={this.formatInput(value)}
               onChange={e => this.parseInput({ label : e.target.value })}
        />

        <Overlay
          target={this.ctrls.target}
          show={this.state.show}
          onHide={e => this.setState({ show : false })}
        >
          {
            <div style={{ display : "block" }} className="dropdown-menu">
              {this.state.options}
            </div>
          }
        </Overlay>
      </div>
    );
  }
}

SelectInput.propTypes = {
  input     : React.PropTypes.shape({
    value    : React.PropTypes.any.isRequired,
    onChange : React.PropTypes.func.isRequired,
  }),
  className : React.PropTypes.string,
  api       : React.PropTypes.string,
};

export { SelectInput };
