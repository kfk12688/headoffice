import React from "react";
import { NavLink } from "../NavLink";

export const LinkCell = ({ value, className }) => {
  const { path, text, urlKey } = value;

  let url = `${path}/${urlKey}`;
  url = url.replace(/ /g, "");

  return (
    <NavLink className={className} to={url}>{text}</NavLink>
  );
};

LinkCell.propTypes = {
  value     : React.PropTypes.shape({
    text : React.PropTypes.string.isRequired,
    path : React.PropTypes.string.isRequired,
  }),
  className : React.PropTypes.string,
};
