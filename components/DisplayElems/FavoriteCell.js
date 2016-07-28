import React from "react";
import FontAwesome from "react-fontawesome";
import { red500 } from "../../styles/colors";

export const FavoriteCell = ({ value: isStarred, inheritSize }) => {
  const faStyle = {
    color    : isStarred ? red500 : "inherit",
    fontSize : inheritSize ? "inherit" : 14,
  };

  let starredElement = null;
  if (isStarred) {
    starredElement = <FontAwesome name="star" style={faStyle}/>;
  } else {
    starredElement = <FontAwesome name="star-o" style={faStyle}/>;
  }

  return starredElement;
};

FavoriteCell.propTypes = {
  value    : React.PropTypes.bool.isRequired,
  inheritSize : React.PropTypes.bool,
};
