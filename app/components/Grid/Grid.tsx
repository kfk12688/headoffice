import * as React from "react";

interface IProps {
  children?: React.ReactNode;
  style?: any;
  other?: Object;
}

const Grid: React.StatelessComponent<IProps> = (props: IProps) => {
  const { children } = props;
  return (
    <div
    className="grid"
  >
    {children}
  </div>
  );
};

Grid.displayName = "Grid";

export { Grid }
