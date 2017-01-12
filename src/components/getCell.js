import moment from "moment";
import R from "ramda";
import React from "react";
import cx from "classnames";
import Actionable from "./Actionable";
import CheckboxIcon from "./CheckboxIcon";
import FavoriteIcon from "./FavoriteIcon";
import ActiveLink from "./ActiveLink";
import Labels from "./Labels";
import ButtonLikeLink from "./ButtonLikeLink";
import styles from "./_styles/common.less";

const RAValue = ({ value }) => <div className={styles.alignRight}><span>{value}</span></div>;
const LAValue = ({ value }) => <div className={styles.alignLeft}><span>{value}</span></div>;

const getCell = {
  number         : (value) => <RAValue value={value}/>,
  checkbox       : (value) => <CheckboxIcon value={value}/>,
  favorite       : (value) => <FavoriteIcon value={value}/>,
  buttonLikeLink : (value, col, id) => {
    const { actions, link, buttonLink } = col;
    const linkPath                      = `/${link.absolutePath}/${id}`;
    const buttonLikeLinkPath            = `/${buttonLink.absolutePath}/${id}`;
    return (
      <div className={styles.inlContainer}>
        <ActiveLink link={linkPath} text={value}/>
        <div className={cx("btn-group", styles.inlContainerElem)}>
          <ButtonLikeLink buttonText={buttonLink.text} link={buttonLikeLinkPath}/>
          <Actionable actions={actions}/>
        </div>
      </div>
    );
  },
  link           : (value, col, id) => {
    const { actions, link } = col;
    const linkPath          = `/${link.absolutePath}/${id}`;
    return (
      <div className={styles.inlContainer}>
        <ActiveLink link={linkPath} text={value}/>
        <Actionable className={styles.inlContainerElem} actions={actions} data={value.text}/>
      </div>
    );
  },
  action         : (_, col, id) => <Actionable actions={col.actions}/>,
  label          : (value) => <Labels value={value}/>,
  join           : (value, col, id) => {
    const values   = [];
    const dataKeys = col.dataKey;
    dataKeys.forEach(k => {
      values.push(value(k));
    });
    return (<LAValue value={values.reduce((ov, nv) => `${ov} ${nv}`)}/>);
  },
  date           : (value, col) => {
    let val;
    if (R.isNil(col.cellFormatter)) {
      val = moment.utc(value).format("DD-MM-YYYY");
    } else {
      val = col.cellFormatter(val);
    }
    return <LAValue value={val}/>;
  },
  text           : (value) => <LAValue value={value}/>,
};

export default getCell;
