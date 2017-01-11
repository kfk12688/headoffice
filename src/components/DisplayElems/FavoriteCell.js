import R from "ramda";
import React from "react";
import { red500 } from "../_styles/colors";

export const FavoriteCell = ({ value, inheritSize, style }) => {
  let isStarred = value;
  if (R.isNil(isStarred)) isStarred = false;
  const faStyle = {
    ...style,
    color    : isStarred ? red500 : "inherit",
    fontSize : inheritSize ? "inherit" : 17,
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
  value       : React.PropTypes.bool,
  inheritSize : React.PropTypes.bool,
};
