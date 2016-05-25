/**
 * Created by sharavan on 12/05/16.
 */
import * as React from "react";
import { Button } from "../Button";
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
    <Button
      style={ Object.assign( {}, {border: 0 }, style ) }
      className = { cx(classes) }
    >
      {children}
    </Button>
  );
};

Tab.displayName  = "Tab";

export { Tab };
