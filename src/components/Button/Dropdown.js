import React from "react";
import { render as renderToDOM, unmountComponentAtNode } from "react-dom";
import cx from "classnames";
import styles from "./Dropdown.less";

class Dropdown extends React.Component {
  constructor() {
    super();
    this.state                      = { show : false };
    this.toggleDropdown             = this.toggleDropdown.bind(this);
    this.getPosition                = this.getPosition.bind(this);
    this.resizeDropDown             = this.resizeDropDown.bind(this);
    this.hideDropdownOnOutsideClick = this.hideDropdownOnOutsideClick.bind(this);
  }

  componentDidMount() {
    console.log("DROPDOWN COMPONENT IS MOUNTED");
    this.dropdownNode              = document.createElement("div");
    this.dropdownNode.style.zIndex = 10000;
    document.body.appendChild(this.dropdownNode);
  }

  componentWillUpdate(nextProps, nextState) {
    const { children }  = nextProps;
    const childElements = React.Children.map(children, (child, idx) => {
      return React.cloneElement(child, {
          key       : idx,
          className : cx("dropdown-item", child.props.className)
        }
      )
    });

    if (nextState.show) {
      const { top, left, height, scrollTop } = this.getPosition();
      const style                            = {
        position : "absolute",
        top      : top + height + scrollTop,
        left,
        display  : "block"
      };
      const dropdownOverlay                  = <div style={style} className="dropdown-menu">
        {childElements}
      </div>;

      this.dropdownOverlayNode = renderToDOM(dropdownOverlay, this.dropdownNode);

      document.addEventListener("click", this.hideDropdownOnOutsideClick);
      window.addEventListener("resize", this.resizeDropDown);
    } else {
      document.removeEventListener("click", this.hideDropdownOnOutsideClick);
      window.removeEventListener("resize", this.resizeDropDown);
      this.dropdownOverlayNode = renderToDOM(<div></div>, this.dropdownNode);
    }
  }

  componentWillUnmount() {
    console.log("DROPDOWN COMPONENT IS GOING TO BE UN-MOUNTED");
    unmountComponentAtNode(this.dropdownNode);
    document.body.removeChild(this.dropdownNode);
  }

  getPosition() {
    const { top, left, height } = this.refs.dropdownRef.getBoundingClientRect();
    const scrollTop             = (window.pageYOffset !== undefined) ? window.pageYOffset :
                                  (document.documentElement || document.body.parentNode || document.body).scrollTop;
    return { left, top, height, scrollTop };
  }

  resizeDropDown(event) {
    event.preventDefault();

    const { top, left, height, scrollTop } = this.getPosition();
    this.dropdownOverlayNode.style.top     = `${top + height + scrollTop}px`;
    this.dropdownOverlayNode.style.left    = `${left}px`;
  }

  hideDropdownOnOutsideClick(event) {
    const ddItems = this.dropdownNode.getElementsByClassName("dropdown-item");
    const flag    = [].reduce.call(ddItems, (ov, item) => {
      return ov || (item === event.target)
    }, false);

    if (!flag) {
      this.setState({ show : false });
    }
  }

  toggleDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ show : !this.state.show });
  }

  render() {
    const { label, disabled, button, className } = this.props;

    if (button) {
      return (
        <button
          ref="dropdownRef"
          className={cx("btn btn-secondary btn-sm", className)}
          type="button"
          disabled={disabled}
          onClick={this.toggleDropdown}
        >
          {label ? <span>{label}&nbsp;<i className="fa fa-caret-down"/></span> : <i className="fa fa-caret-down"/>}
        </button>
      );
    }

    return (
      <button
        ref="dropdownRef"
        disabled={disabled}
        style={{ border : "none", backgroundColor : "transparent" }}
        className={cx(className, { [styles.plainEnabled] : !disabled, [styles.plainDisabled] : disabled })}
        onClick={!disabled && this.toggleDropdown}
      >
        {label ? <span>{label}&nbsp;<i className="fa fa-caret-down"/></span> : <i className="fa fa-caret-down"/>}
      </button>
    );
  }
}

export { Dropdown };

Dropdown.propTypes = {
  className : React.PropTypes.string,
  label     : React.PropTypes.string,
  button    : React.PropTypes.bool,
  disabled  : React.PropTypes.bool,
};
