import * as React from "react";
import "./Grid.less";

interface IProps {
  children?: React.ReactNode;
  style?: any;
  other?: Object;
}

const Grid: React.StatelessComponent<IProps> = (props: IProps) => {
  const { children } = props;
  return (
    <div
    className="ho-grid"
  >
    {children}
  </div>
  );
};

Grid.displayName = "Grid";

export { Grid }
