/**
 * Created by sharavan on 12/05/16.
 */
import React from "react";
import cx from "classnames";

const TabGroup = ({ children, style, className, childClassName }) => {
  const classes = {};
  classes[childClassName] = !!childClassName;

  const tabs = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      className : cx(classes),
      style,
    });
  });

  return <div className={className}>{tabs}</div>;
};

TabGroup.displayName = "TabGroup";

export { TabGroup };

