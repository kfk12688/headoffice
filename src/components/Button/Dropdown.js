import React from "react";
import cx from "classnames";
import { isNil } from "utils";
import styles from "./Dropdown.less";
import { render as renderToDOM } from "react-dom";

class Dropdown extends React.Component {
  constructor() {
    super();
    this.getPosition        = this.getPosition.bind(this);
    this.drawDropdown       = this.drawDropdown.bind(this);
    this.removeDropdown     = this.removeDropdown.bind(this);
    this.resizeDropDown     = this.resizeDropDown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.ddContainer        = document.getElementById("DropDown");
  }

  componentWillUnmount() {
    this.removeDropdown();
  }

  getPosition() {
    const { top, left, height } = this.buttonNode.getBoundingClientRect();
    const scrollTop             = (window.pageYOffset !== undefined) ? window.pageYOffset :
                                  (document.documentElement || document.body.parentNode || document.body).scrollTop;
    return { left, top, height, scrollTop };
  }

  drawDropdown() {
    const { children }                     = this.props;
    const childElements                    = React.Children.map(children, (child, idx) => {
      return React.cloneElement(child, {
        key       : idx,
        className : cx("dropdown-item", child.props.className),
      });
    });
    const { top, left, height, scrollTop } = this.getPosition();
    const style                            = {
      position : "absolute",
      top      : top + height + scrollTop,
      left,
      display  : "block",
    };
    const dropdown                         = (
      <div style={style}
           ref={node => { this.dropdownNode = node; }}
           className="dropdown-menu"
      >
        {childElements}
      </div>
    );

    renderToDOM(dropdown, this.ddContainer);
    document.body.addEventListener("click", this.handleOutsideClick);
  }

  removeDropdown() {
    renderToDOM(<div></div>, this.ddContainer);
    document.body.removeEventListener("click", this.handleOutsideClick);
  }

  resizeDropDown(event) {
    event.preventDefault();

    const { top, left, height, scrollTop } = this.getPosition();
    this.dropdownNode.style.top            = `${top + height + scrollTop}px`;
    this.dropdownNode.style.left           = `${left}px`;
  }

  handleOutsideClick(event) {
    if (!this.dropdownNode.contains(event.target)) {
      this.removeDropdown();
    }
  }

  render() {
    const { label, disabled, button, className } = this.props;
    const labelElem                              = isNil(label) ?
                                                   <i className="fa fa-caret-down"/> :
                                                   <span>{label}&nbsp;<i className="fa fa-caret-down"/></span>;

    if (button) {
      return (
        <button ref={node => { this.buttonNode = node; }}
                className={cx("btn btn-secondary btn-sm", className)}
                type="button"
                disabled={disabled}
                onClick={!disabled && this.drawDropdown}
        >
          {labelElem}
        </button>
      );
    }

    return (
      <button ref={node => { this.buttonNode = node; }}
              disabled={disabled}
              style={{ border : "none", backgroundColor : "transparent" }}
              className={cx(className, { [styles.plainEnabled] : !disabled, [styles.plainDisabled] : disabled })}
              onClick={!disabled && this.drawDropdown}
      >
        {labelElem}
      </button>
    );
  }
}

Dropdown.propTypes = {
  className : React.PropTypes.string,
  label     : React.PropTypes.string,
  button    : React.PropTypes.bool,
  disabled  : React.PropTypes.bool,
  children  : React.PropTypes.node,
};
export { Dropdown };
