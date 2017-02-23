import React from "react";
import { isNil } from "utils";
import { red500 } from "./_styles/colors";

const FavoriteIcon = ({ value, inheritSize, style }) => {
  const isStarred = isNil(value) ? false : value;
  const faStyle   = {
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

FavoriteIcon.propTypes = {
  style       : React.PropTypes.object,
  value       : React.PropTypes.bool,
  inheritSize : React.PropTypes.bool,
};

export default FavoriteIcon;
