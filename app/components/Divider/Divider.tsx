/**
 * Created by sharavan on 16/05/16.
 */
import * as React from "react";
import "./Divider.less";
import { grey200 } from "../../client/styles/colors";
let classnames: any = require("classnames");

// fixme : Incorrect type for props... however, generates a tsint error
function getStyles(props: any): Object {
  const { fullSpan, vertical, size } = props;
  let dynSetting: any = vertical ?
                        {
                          display      : "inline-block",
                          height       : size.h,
                          verticalAlign: "top",
                          width        : size.w,
                        } :
                        {
                          height: size,
                        };
  let defSetting      = {
    backgroundColor: grey200,
    border         : "none",
    margin         : fullSpan ? "0 -10px" : 0,
  };
  return Object.assign({}, dynSetting, defSetting);
}

interface IProps {
  size?: number |
    string |
    {
      h?: number | string;
      w?: number | string;
    };
  vertical?: boolean;
  fullSpan?: boolean;
  style?: Object;
  className?: Object;
}

const Divider: React.StatelessComponent<IProps> = (props: IProps) => {
  const { style, vertical, className } = props;
  const dividerStyle = Object.assign({}, getStyles(props), style);

  if (vertical) {
    return <span className={classnames("ho-divider", className)} style={dividerStyle}/>;
  } else {
    return <hr className={classnames("ho-divider", className)} style={dividerStyle}/> ;
  }
};

Divider.displayName  = "Divider";
Divider.defaultProps = {
  fullSpan: false,
  size    : 1,
  vertical: false,
};

export { Divider }
