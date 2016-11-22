import React from "react";
import { Button } from "./index";
import cx from "classnames";

class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = { show : false };
    this.ctrls = {};

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.hideDropdownOnOutsideClick = this.hideDropdownOnOutsideClick.bind(this);
  }
  
  componentWillUpdate(nextProps, nextState) {}

  hideDropdownOnOutsideClick(event) {
    if (event.target === document.getElementsByClassName("dropdown")[0]) {
      event.preventDefault();
      event.stopPropagation();
      this.props.hideDropdown();
    }
  }

  toggleDropdown(){
    console.log(this.state);
    this.setState({ show : !this.state.show });
  }

  render() {
    const { label, disabled, className, type } = this.props;

    if(type === "button") {
      return (
        <Button className={className} disabled={disabled}
          onClick={this.toggleDropdown}
        >
          {label}
        </Button>
      );
    }

    return ( 
      <span className={className} disabled={disabled}
       onClick={this.toggleDropdown}
      >
        {label}
      </span>
    );  
  }
}

export {Dropdown};

Dropdown.propTypes = {
  className     : React.PropTypes.string,
  style         : React.PropTypes.object,
  bordered      : React.PropTypes.bool,
  label         : React.PropTypes.string,
  faName        : React.PropTypes.string,
  children      : React.PropTypes.any,
  size          : React.PropTypes.string,
  type          : React.PropTypes.string,
  disabled      : React.PropTypes.bool,
};
