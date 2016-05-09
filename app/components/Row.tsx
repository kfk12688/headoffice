import * as React from "react";

interface IProps {
  // fixme: Is DOMElement interface correct here
  componentClass?: React.StatelessComponent<{}> | string;
  height?: number | string;
  fullWidth?: boolean;
  children?: Array <React.DOMElement>;
}

class Row extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  static defaultProps = {
    componentClass: "div"
  };

  render() {
    var ComponentClass = this.props.componentClass;

    // fixme: Only by removing position absolute divs are displayed one below the other
    var divStyle: {} = {
      // position : "absolute",
      left   : 0,
      right  : 0,
      height : this.props.height,
      padding: "2px 0",
      margin : this.props.fullWidth && "0 -10px"
    };

    return (
      <ComponentClass style={divStyle} height={this.props.height}>
        {this.props.children}
      </ComponentClass>
    );

  }
}

export {Row}
