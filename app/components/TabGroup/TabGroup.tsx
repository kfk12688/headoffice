/**
 * Created by sharavan on 12/05/16.
 */

import * as React from "react";

interface IProps {
  /**
   * Hover color for the Tab button
   */
  hoverColor?: string;
  /**
   * Normal css color of the Tab component
   */
  color?: string;
  /**
   * Custom style CSS for the component
   */
  style?: Object;
  /**
   * The children node passed in from the parent component
   */
  children?: React.ReactNode;
}

const TabGroup: React.StatelessComponent<IProps> = (props: IProps) => {
  const { children, style, color, hoverColor } = props;
  const tabs = React.Children.map(children, (child: React.ReactElement<any>, index: number) => {
    return React.cloneElement(child, {
      color : color,
      hoverColor : hoverColor,
      style : style,
    });
  });

  return (
    <div>
      {tabs}
    </div>
  );
};

TabGroup.displayName = "TabGroup";

export { TabGroup }

