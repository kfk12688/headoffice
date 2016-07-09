import React from "react";
import style from "./common.less";
import { NavLink } from "../NavLink";

export const LinkCell = ({ value }) => {
  const { path, text, urlKey } = value;

  let url = `${path}/${urlKey}`;
  url = url.replace(/ /g, "");

  return (
    <div className={style.alignLeft}>
      <NavLink to={url}>{text}</NavLink>
    </div>
  );
};

LinkCell.propTypes = {
  value : React.PropTypes.shape({
    text   : React.PropTypes.string.isRequired,
    path   : React.PropTypes.string.isRequired,
  }),
};
