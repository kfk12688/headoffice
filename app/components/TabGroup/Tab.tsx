/**
 * Created by sharavan on 12/05/16.
 */
import * as React from "react";
const cx: any = require("classnames");

interface IProps {
  children?: React.ReactNode;
  style?: Object;
  className?: string;
}

const Tab: React.StatelessComponent<IProps> = (props: IProps) => {
  const { style, children, className } = props;
  const classes: any = {};
  classes[className] = !!className;

  return (
    <span
      style={ Object.assign( {}, {border: 0 }, style ) }
      className = { cx("ho-tab", classes) }
    >
      {children}
    </span>
  );
};

Tab.displayName  = "Tab";

export { Tab };
