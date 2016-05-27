import * as React from "react";
import "./Col.less";
let classnames: any = require("classnames");

function getStyles(props: IProps): Object {
  return {
    width: props.size * 100 / 12 + "%",
  };
}

interface IProps {
  children?: React.ReactNode;
  /**
   * Specifies the col width (of 12 column grid)
   */
  size?: number;
  /**
   * custom CSS style properties
   */
  style?: Object;
  className?: string;
}

const Col: React.StatelessComponent<IProps> = (props: IProps) => {
  const { children, style, className } = props;
  return (
    <div
      style={ Object.assign({}, getStyles(props),style) }
      className={ classnames("ho-col", className) }
    >
      {children}
    </div>
  );
};

Col.displayName  = "Col";

export { Col }
