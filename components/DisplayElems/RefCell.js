import React from "react";
import FontAwesome from "react-fontawesome";
import style from "./common.less";

export const RefCell = ({ value }) => {
  const refTable = value && value.refTable;
  const refField = value && value.refField;

  return (
    <div className={style.alignLeft}>
      {refTable && refTable.name && <span style={style.span}>{refTable.name}</span>}
      {refTable && refField && <FontAwesome style={style.fa} name="long-arrow-right"/>}
      {refField && refField.name && <span style={style.span}>{refField && refField.name || null}</span>}
      {!refTable && !refField && <span>null</span>}
    </div>
  );
};

RefCell.propTypes = {
  value : React.PropTypes.shape({
    refTable : React.PropTypes.shape({
      key : React.PropTypes.any,
      name : React.PropTypes.string,
    }),
    refField : React.PropTypes.shape({
      key : React.PropTypes.any,
      name : React.PropTypes.string,
    }),
  }),
};
