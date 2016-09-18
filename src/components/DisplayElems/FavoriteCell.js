import React from "react";
import { red500 } from "../styles/colors";

export const FavoriteCell = ({ value: isStarred, inheritSize, style }) => {
  const faStyle = {
    ...style,
    color    : isStarred ? red500 : "inherit",
    fontSize : inheritSize ? "inherit" : 14,
  };

  let starredElement = null;
  if (isStarred) {
    starredElement = <i className="fa fa-star" style={faStyle}/>;
  } else {
    starredElement = <i className="fa fa-star-o" style={faStyle}/>;
  }

  return starredElement;
};

FavoriteCell.propTypes = {
  style       : React.PropTypes.object,
  value       : React.PropTypes.bool.isRequired,
  inheritSize : React.PropTypes.bool,
};
