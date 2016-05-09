import * as React from "react";

interface IProps {
  componentClass?: React.StatelessComponent <{}> | string;
}

class Grid extends React.Component < IProps, {} > {
  constructor(props: IProps) {
    super(props);
  }

  static defaultProps = {
    componentClass: "div"
  };

  render() {
    var ComponentClass = this.props.componentClass;

    var divStyle: {} = {
      position: "absolute",
      top     : 0,
      bottom  : 0,
      left    : 0,
      right   : 0,
      margin  : "0 10px"
    };

    return (
      <ComponentClass
        style={divStyle}
        {...this.props}
      >
        {this.props.children}
      </ComponentClass>
    );
  }
}

export {Grid}
