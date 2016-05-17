/**
 * Created by sharavan on 16/05/16.
 */

import * as React from "react";
import { blackLightest } from "../internal/styles/colors";


function getStyles(props: IProps): Object {
  const { fullSpan, vertical, size }: IProps = props;
  let dynSetting = vertical ?
                   {
                     display      : "inline-block",
                     height       : size.h,
                     verticalAlign: "top",
                     width        : size.w,
                   } :
                   {
                     height: size,
                   };
  let defSetting = {
    backgroundColor: blackLightest,
    border         : "none",
    margin         : fullSpan ? "0 -10px" : 0,
  };
  return Object.assign({}, dynSetting, defSetting);
}

interface IProps {
  size?: number | string | { h?: number | string, w: number | string };
  vertical?: boolean;
  fullSpan?: boolean;
  style?: Object;
}

const Divider: React.StatelessComponent<IProps> = (props: IProps) => {
  const { style, vertical } = props;
  const dividerStyle = Object.assign({}, getStyles(props), style);
  if (vertical) {
    return <span style={dividerStyle}/>;
  } else {
    return <hr style={dividerStyle}/> ;
  }
};

Divider.displayName  = "Divider";
Divider.defaultProps = {
  fullSpan: false,
  size    : 1,
  vertical: false,
};

export { Divider }
