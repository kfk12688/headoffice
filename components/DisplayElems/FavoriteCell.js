import React from "react";
import FontAwesome from "react-fontawesome";
import { red500 } from "../../styles/colors";

export const FavoriteCell = ({ value: isStarred }) => {
  const faStyle = {
    color    : isStarred ? red500 : "inherit",
    fontSize : 15,
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
  value : React.PropTypes.bool.isRequired,
};
