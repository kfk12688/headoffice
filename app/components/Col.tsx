import * as React from "react";

interface IProps {
  componentClass?: React.StatelessComponent <{}> | string;
  size?: number;
}

class Col extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  static defaultProps = {
    componentClass: "div",
    size          : 1
  };

  render() {
    var ComponentClass = this.props.componentClass;

    var divStyle = {
      width : this.props.size * 8.333334 + "%",
      height: "100%"
    };

    return (
      <ComponentClass style={divStyle}>
        {this.props.children}
      </ComponentClass>
    );

  }
}

export {Col}
