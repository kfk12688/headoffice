import React from "react";
import { NavLink } from "../NavLink";
import style from "./common.less";
import cx from "classnames";

export const LinkCell = ({ value, className }) => {
  const { path, text, urlKey } = value;

  let url = `${path}/${urlKey}`;
  url = url.replace(/ /g, "");

  return (
    <div className={cx(style.alignLeft, className)}>
      <NavLink to={url}>{text}</NavLink>
    </div>
  );
};

LinkCell.propTypes = {
  value     : React.PropTypes.shape({
    text : React.PropTypes.string.isRequired,
    path : React.PropTypes.string.isRequired,
  }),
  className : React.PropTypes.string,
};
