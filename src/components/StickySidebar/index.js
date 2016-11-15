import React from "react";

class StickySidebar extends React.Component {
  constructor() {
    super();
    this.state = { scrollTop : 0 };
    this.setScrollTop = this.setScrollTop.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.setScrollTop);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.setScrollTop);
  }

  setScrollTop() {
    this.setState({ scrollTop : window.scrollY });
  }

  render() {
    const { top, children } = this.props;

    const parentStyle = {
      position : (top >= this.state.scrollTop) ? "static" : "fixed",
      top      : (top <= this.state.scrollTop) && 0,
    };

    return (<div style={parentStyle}>{children}</div>);
  }
}

StickySidebar.propTypes = {
  width    : React.PropTypes.number,
  top      : React.PropTypes.number.isRequired,
  right    : React.PropTypes.number,
  left     : React.PropTypes.number,
  bottom   : React.PropTypes.number,
  children : React.PropTypes.object,
};

export { StickySidebar };
