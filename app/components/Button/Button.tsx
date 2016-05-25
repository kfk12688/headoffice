/**
 * Created by sharavan on 12/05/16.
 */
import * as React from "react";
import "font-awesome-webpack";
let FontAwesome: any = require("react-fontawesome");
const cx: any = require("classnames");

interface IProps {
  style?: Object;
  className?: string;
  faName?: string;
  faClassName?: string;
  children?: React.ReactChildren;
}

const Button: React.StatelessComponent<IProps> = (props: IProps) => {
  const { style, className, faName, faClassName } = props;
  const classes: any = {
    "ho-btn" : !className,
  };
  classes[className] = !!className;

  const faIcon = faName && <FontAwesome name={faName} className={faClassName}></FontAwesome>;

  return (
    <button
      style={style}
      className={ cx(classes) }
    >
      {faIcon}
      {props.children}
    </button>
  );
};

Button.displayName = "Button";

export { Button }
