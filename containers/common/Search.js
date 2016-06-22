/**
 * Created by sharavan on 15/05/16.
 */
import moment from "moment";
import _ from "underscore";
import React from "react";
import { Divider, PopupSearchBox, PopupDateBox, PopupCheckBox, SearchBox } from "components/index";
import styles from "./Search.less";
import cx from "classnames";

const Search = (props) => {
  let { owner, isStarred, isRecent, dateModifiedStart, dateModifiedEnd } = props.filterData;
  dateModifiedStart = dateModifiedStart.isValid() ? moment(dateModifiedStart).format("YYYY-MM-DD") : "";
  dateModifiedEnd = dateModifiedEnd.isValid() ? moment(dateModifiedEnd).format("YYYY-MM-DD") : "";
  const changeHandlers = props.changeHandlers;

  const ClearSpan = ({ h }) => <span className={styles.clear} onClick={h}>Clear</span>;
  const dividerStyle = {
    bottom   : 0,
    position : "absolute",
    right    : 0,
    top      : 0,
  };

  return (
    <div className={ cx(styles.base, props.className) }>
      <div className={styles.textBox}>
        <SearchBox />
      </div>
      <Divider fullSpan size={1}/>
      <div>
        <div className={styles.filterHeader}>General Filters</div>
        <div className={styles.filterHeaderBlock}>

          <div className={styles.filterHeaderBlock}>
            <div>
              <span className={styles.label}>Owner</span>
              {!(_.isEmpty(owner)) && <ClearSpan h={changeHandlers.setOwner}/>}
            </div>
            <PopupSearchBox
              value={owner}
              onChangeHandler={changeHandlers.setOwner}
              matchParentWidth
            />
          </div>

          <div className={styles.filterHeaderBlock}>
            <div>
              <span className={styles.label}>Created on or after</span>
              {!(_.isEmpty(dateModifiedStart)) && <ClearSpan h={changeHandlers.setDateModifiedStart}/>}
            </div>
            <PopupDateBox
              value={dateModifiedStart}
              onChangeHandler={changeHandlers.setDateModifiedStart}
            />
          </div>

          <div className={styles.filterHeaderBlock}>
            <div>
              <span className={styles.label}>Created on or before</span>
              {!(_.isEmpty(dateModifiedEnd)) && <ClearSpan h={changeHandlers.setDateModifiedEnd}/>}
            </div>
            <PopupDateBox
              value={dateModifiedEnd}
              onChangeHandler={changeHandlers.setDateModifiedEnd}
            />
          </div>

          <div className={styles.filterHeaderBlock}>
            <PopupCheckBox
              value={isStarred}
              onChangeHandler={changeHandlers.setIsStarred}
            />
            <span className={styles.label}>Show starred only</span>
          </div>

          <div className={styles.filterHeaderBlock}>
            <PopupCheckBox
              value={isRecent}
              onChangeHandler={changeHandlers.setIsRecent}
            />
            <span className={styles.label}>Recents only</span>
          </div>

        </div>
      </div>
      <Divider vertical style={dividerStyle} size={{ h: "auto", w: 5 }}/>
    </div>
  );
};

export { Search };
