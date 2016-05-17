/**
 * Created by sharavan on 12/05/16.
 */

import * as React from "react";
import { accentDark, blackDark } from "../internal/styles/colors";
import { Tab } from "./Tab";

interface IProps {
  /**
   * Children content for the tab
   */
  children?: React.ReactNode;
  /**
   * Normal css color of the Tab component
   */
  color?: string;
  /**
   * Hover color for the Tab button
   */
  hoverColor?: string;
  /**
   * Custom style CSS for the component
   */
  style?: Object;
  /**
   * Additional meta information for the component
   */
  meta?: { count: number };
}

// tslint-disable : no-unused-variable
function getStyles(props: IProps): Object {
  return {
    borderBottom : accentDark + " solid 3px",
    borderLeft   : 0,
    borderRight  : 0,
    borderTop    : 0,
    fontSize     : 16,
    fontWeight   : 500,
    paddingBottom: 10,
    paddingTop   : 10,
  };
}

const TabMeta: React.StatelessComponent<IProps> = (props: IProps) => {
  const { children, meta, style } = props;

  return (
    <span className="tab-meta">
      <Tab style={ Object.assign({}, getStyles(props), style) }>{children}</Tab>
      <span className="tab-meta-data">{meta.count}</span>
    </span>
  );
};

TabMeta.displayName  = "TabMeta";
TabMeta.defaultProps = {
  color     : blackDark,
  hoverColor: accentDark,
};

export { TabMeta };
