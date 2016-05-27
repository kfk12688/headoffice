import * as React from "react";
import "./Row.less";
let classnames: any = require("classnames");

function getStyles(props: IProps): Object {
  return {
    height: props.height,
    margin: props.fullWidth ? "0 -10px" : "0 10px",
  };
}

interface IProps {
  /**
   * Makes the row span the entire container width
   */
  fullWidth?: boolean;
  /**
   * Specified the height of the Row container
   */
  height?: number | string;
  /**
   * The custom style object
   */
  style?: Object;
  className?: string;
  children?: React.ReactNode;
}

const Row: React.StatelessComponent<IProps> = (props: IProps) => {
  const { children, style, className } = props;
  return (
    <div
      style={ Object.assign({}, getStyles(props), style )}
      className={ classnames("ho-row", className) }
    >
      {children}
    </div>
  );
};

Row.displayName  = "Row";
Row.defaultProps = {
  fullWidth: false,
  height   : "auto",
};

export { Row }
