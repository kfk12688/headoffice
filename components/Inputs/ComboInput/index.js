import React from "react";
import Overlay from "react-overlays/lib/Overlay";
import styles from "./ComboInput.less";
import cx from "classnames";

class ComboInput extends React.Component {
  constructor(props) {
    super(props);
    this.popupMenuStyle = undefined;
    this.state = {
      hovered   : false,
      showPopup : false,
    };
    this.ctrls = {};
    this.assignTarget = target => { this.ctrls.target = target; };
    this.handleClick = this.handleClick.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.listItems = props.list.map((elem, idx) => ({ key : idx, text : elem }));
  }

  componentDidMount() {
    this.popupMenuStyle = {
      width : this.ctrls.target.getBoundingClientRect().width,
      ...this.props.childrenStyle,
    };
  }

  setFieldValue(value) {
    const { field } = this.props;
    field.onChange(value);
  }

  handleClick() {
    if (this.state.showPopup) {
      this.setState({ showPopup : false });
    } else {
      this.setState({ showPopup : true });
    }
  }

  render() {
    const { className, field } = this.props;

    return (
      <span
        ref={this.assignTarget}
        className={cx(className, styles.base)}
        onClick={this.handleClick}
        onMouseEnter={() => this.setState({ hovered : true })}
        onMouseLeave={() => this.setState({ hovered : false })}
      >
        <i className={cx("fa fa-caret-down", styles.faIcon)} title="Click to open"/>
        {field.value}
        <Overlay
          rootClose
          placement="bottom"
          show={this.state.showPopup}
          target={() => this.ctrls.target}
          onHide={() => this.setState({ showPopup : false })}
        >
          <div className={styles.items} style={this.popupMenuStyle}>
            {
              this.listItems.map(item =>
                <div
                  key={item.key}
                  onClick={e => this.setFieldValue(e.target.innerText)}
                >
                  {item.text}
                </div>)
            }
          </div>
        </Overlay>
      </span>
    );
  }
}

ComboInput.propTypes = {
  className     : React.PropTypes.string,
  field         : React.PropTypes.object.isRequired,
  list          : React.PropTypes.arrayOf(React.PropTypes.string),
  childrenStyle : React.PropTypes.object,
};

export { ComboInput };
