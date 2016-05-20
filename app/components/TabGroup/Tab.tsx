/**
 * Created by sharavan on 12/05/16.
 */

import * as React from "react";
import { Button } from "../Button";
import { grey500, grey900 } from "../../client/styles/colors";

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
}

// tslint-disable : no-unused-variable
function getStyles(props: IProps): Object {
  return {
    border  : 0,
    fontSize: 13,
  };
}

const Tab: React.StatelessComponent<IProps> = (props: IProps) => {
  const { color, hoverColor, style, children } = props;
  return (
    <Button
      style={ Object.assign( {}, getStyles(props), style ) }
      color={color}
      hoverColor={hoverColor}
    >
      {children}
    </Button>
  );
};

Tab.displayName  = "Tab";
Tab.defaultProps = {
  color     : grey500,
  hoverColor: grey900,
};

export { Tab };
