import moment from "moment";
import R from "ramda";
import React from "react";
import cx from "classnames";
import styles from "./_styles/common.less";
import { Button, ActiveLink, Labels, ButtonLikeLink, Actionable, CheckboxIcon, FavoriteIcon } from "components";

const RAValue = ({ value }) => <div className={styles.alignRight}><span>{value}</span></div>;
const LAValue = ({ value }) => <div className={styles.alignLeft}><span>{value}</span></div>;

const getCell = {
  number         : (value) => <RAValue value={value}/>,
  checkbox       : (value) => <CheckboxIcon value={value}/>,
  favorite       : (value, col, id) => <Button className={styles.favoriteBtn}
                                               onClick={() => col.action(id)}
  >
    <FavoriteIcon value={value}/>
  </Button>,
  buttonLikeLink : (value, col, id) => {
    const { actions, link, buttonLink } = col;
    const linkPath                      = `/${link.absolutePath}/${id}`;
    const buttonLikeLinkPath            = `/${buttonLink.absolutePath}/${id}`;
    return (
      <div className={styles.inlContainer}>
        <ActiveLink link={linkPath} text={value}/>
        <div className={cx("btn-group", styles.inlContainerElem)}>
          <ButtonLikeLink buttonText={buttonLink.text} link={buttonLikeLinkPath}/>
          <Actionable actions={actions} id={id}/>
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
        <Actionable className={styles.inlContainerElem} actions={actions} id={id}/>
      </div>
    );
  },
  action         : (_, col, id) => <Actionable actions={col.actions} id={id}/>,
  label          : (value) => <Labels value={value}/>,
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
  string         : (value) => <LAValue value={value}/>,
  schema         : (value) => <LAValue value={value.toString()}/>,
  schemaArray    : (value) => <LAValue value={value.toString()}/>,
};

export default getCell;
