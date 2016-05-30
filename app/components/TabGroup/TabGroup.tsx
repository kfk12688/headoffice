/**
 * Created by sharavan on 12/05/16.
 */
import * as React from "react";
const cx: any = require("classnames");

interface IProps {
  style?: Object;
  children?: React.ReactNode;
  className?: string;
  childClassName?: string;
}

const TabGroup: React.StatelessComponent<IProps> = (props: IProps) => {
  const { children, style, className, childClassName } = props;

  const classes: any = {};
  classes[childClassName] = !!childClassName;

  const tabs = React.Children.map(children, (child: React.ReactElement<any>, index: number) => {
    return React.cloneElement(child, {
      className : cx(classes),
      style : style,
    });
  });

  return <div className={className}>{tabs}</div>;
};

TabGroup.displayName = "TabGroup";

export { TabGroup }

