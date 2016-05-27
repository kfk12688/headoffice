/**
 * Created by sharavan on 12/05/16.
 */

import * as React from "react";
import { redA200, grey500 } from "../../client/styles/colors";
import { Tab } from "./Tab";
import "./TabGroup.less";

interface IProps {
  children?: React.ReactNode;
  style?: Object;
  meta?: { count: number };
  className?: string;
}

const TabMeta: React.StatelessComponent<IProps> = (props: IProps) => {
  const { children, meta, style } = props;

  return (
    <span className="tab-meta">
      <Tab
        className="tab-meta-btn"
        style={ Object.assign(
          {}, {
            borderBottom: redA200 + " solid 3px",
          },
          style
        )}
      >
        {children}
      </Tab>
      <span className="tab-meta-data">{meta.count}</span>
    </span>
  );
};

TabMeta.displayName = "TabMeta";

export { TabMeta };
