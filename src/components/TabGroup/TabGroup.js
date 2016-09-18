/**
 * Created by sharavan on 12/05/16.
 */
import React from "react";
import cx from "classnames";

const TabGroup = ({ children, style, className, childClassName }) => {
  const classes = {};
  classes[childClassName] = !!childClassName;

  const tabs = React.Children.map(children, (child, index) => React.cloneElement(child, {
    className : cx(classes),
    style,
  }));

  return <div className={className}>{tabs}</div>;
};

TabGroup.displayName = "TabGroup";
TabGroup.propTypes = {
  children       : React.PropTypes.node.isRequired,
  style          : React.PropTypes.object,
  className      : React.PropTypes.string,
  childClassName : React.PropTypes.string,
};

export { TabGroup };

