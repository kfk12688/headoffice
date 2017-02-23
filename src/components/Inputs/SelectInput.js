import React from "react";
import { render as renderToDOM } from "react-dom";
import { imap, has, prop } from "utils";
import fetch from "dataflow/fetchWrapper";

class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.autoload  = props.autoload;
    this.state     = {
      searchItem : { id : "dummyID" },
    };
    this.container = window.document.getElementById("Overlay");

    this.setInput           = this.setInput.bind(this);
    this.parseInput         = this.parseInput.bind(this);
    this.formatInput        = this.formatInput.bind(this);
    this.loadOptions        = this.loadOptions.bind(this);
    this.draw               = this.draw.bind(this);
    this.undraw             = this.undraw.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillUnmount() {
    this.undraw();
  }

  getPosition() {
    const { top, left, height } = this.inputNode.getBoundingClientRect();
    const scrollTop             = (window.pageYOffset !== undefined) ? window.pageYOffset :
                                  (document.documentElement || document.body.parentNode || document.body).scrollTop;
    return { left, top, height, scrollTop };
  }

  setInput(item) {
    const { input } = this.props;
    input.onChange(item);
    this.undraw();
  }

  parseInput(item) {
    const { input } = this.props;
    const queryText = item.label;
    input.onChange(item);

    this.setState(() => {
      this.loadOptions(queryText);
      return { searchItem : item };
    });
  }

  formatInput(item) {
    if (item && has("label", item)) return prop("label", item);
    return "";
  }

  loadOptions(text) {
    const { api }         = this.props;
    const transformToDivs = (item, idx) => <div key={idx}
                                                className="dropdown-item"
                                                onClick={e => this.setInput({ id : item.id, label : item.label })}
                                                data-id={item.id}
                                                data-value={item.label}>
      {item.label}
    </div>;

    fetch("GET", api)
      .then(res => res.json())
      .then(options => {
        const content = imap(transformToDivs, options);
        this.draw(content);
      });
  }

  draw(options) {
    const { top, left, height, scrollTop } = this.getPosition();
    const style                            = {
      zIndex   : 1100,
      position : "absolute",
      top      : top + height + scrollTop,
      left,
      display  : "block",
    };
    const element                          = (
      <div style={style} className="dropdown-menu">
        {options}
      </div>
    );

    return new Promise(resolve => resolve(renderToDOM(element, this.container)))
      .then(node => window.document.body.addEventListener("click", e => this.handleOutsideClick(e, node)));
  }

  undraw() {
    return new Promise(resolve => resolve(renderToDOM(<div></div>, this.container)))
      .then(node => window.document.body.removeEventListener("click", e => this.handleOutsideClick(e, node)));
  }

  handleOutsideClick(event, node) {
    if (!node.contains(event.target)) this.undraw();
  }

  render() {
    const { value }     = this.props.input;
    const clickHandler  = (e) => {
      if (this.autoload) {
        this.autoload = false;
        return this.parseInput({ label : "" });
      }
      return () => {};
    };

    return (
      <input ref={trgt => { this.inputNode = trgt; }}
             type="text"
             className="form-control"
             placeholder="Search..."
             value={this.formatInput(value)}
             onClick={clickHandler}
             onChange={e => this.parseInput({ label : e.target.value })}
      />
    );
  }
}

SelectInput.propTypes    = {
  autoload  : React.PropTypes.bool,
  input     : React.PropTypes.object,
  className : React.PropTypes.string,
  api       : React.PropTypes.string,
};
SelectInput.defaultProps = {
  autoload : false,
};

export { SelectInput };
