/**
 * Created by sharavan on 12/05/16.
 */
import * as React from "react";
import "font-awesome-webpack";
import "./Button.less";
const FontAwesome: any = require("react-fontawesome");
const cx: any          = require("classnames");

interface IProps {
  style?: Object;
  className?: string;
  faName?: string;
  faClassName?: string;
  children?: React.ReactChildren;
  onClick?: Function;
  after?: boolean;
}

const Button: React.StatelessComponent<IProps> = (props: IProps) => {
  const { style, className, faName, faClassName, onClick, after } = props;
  const faIcon = faName && <FontAwesome name={faName} className={faClassName}></FontAwesome>;

  if (after) {
    return (
      <button style={style} className={ cx("ho-btn", className) } onClick={onClick}>
        {props.children}
        {" "}
        {faIcon}
      </button>
    );
  } else {
    return (
      <button style={style} className={ cx("ho-btn", className) } onClick={onClick}>
        {faIcon}
        {" "}
        {props.children}
      </button>
    );
  }
};

Button.displayName = "Button";

export { Button }
