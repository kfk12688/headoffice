import * as React from "react";
import "./Row.less";

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
  other?: Object;
  children?: React.ReactNode;
}

const Row: React.StatelessComponent<IProps> = (props: IProps) => {
  const { children, style, ...other } = props;
  return (
    <div
      style={ Object.assign({}, getStyles(props), style )}
      className="ho-row"
      {...other}
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
