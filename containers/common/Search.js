/**
 * Created by sharavan on 15/05/16.
 */
import moment from "moment";
import React from "react";
import { isEmpty } from "underscore";
import { PopupSearchBox, PopupDateBox, PopupCheckBox, SearchBox } from "../../components";
import cx from "classnames";
import styles from "./Search.less";

const Search = (props) => {
  let { owner, isStarred, isRecent, dateModifiedStart, dateModifiedEnd } = props.filterData;
  dateModifiedStart = dateModifiedStart.isValid() ? moment(dateModifiedStart).format("YYYY-MM-DD") : "";
  dateModifiedEnd = dateModifiedEnd.isValid() ? moment(dateModifiedEnd).format("YYYY-MM-DD") : "";
  const changeHandlers = props.changeHandlers;

  const ClearSpan = ({ h }) => <span className={styles.clear} onClick={h}>Clear</span>;
  return (
    <div className={ cx(styles.base, props.className) }>
      <div className={styles.searchbox}>
        <SearchBox />
      </div>
      <div>
        <div className={styles.filterHeader}>General Filters</div>
        <div className={styles.filterHeaderBlock}>

          <div className={styles.filterHeaderBlock}>
            <div>
              <span className={styles.label}>Owner</span>
              {!isEmpty(owner) && <ClearSpan h={changeHandlers.setOwner}/>}
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
              {!isEmpty(dateModifiedStart) && <ClearSpan h={changeHandlers.setDateModifiedStart}/>}
            </div>
            <PopupDateBox
              value={dateModifiedStart}
              onChangeHandler={changeHandlers.setDateModifiedStart}
            />
          </div>

          <div className={styles.filterHeaderBlock}>
            <div>
              <span className={styles.label}>Created on or before</span>
              {!isEmpty(dateModifiedEnd) && <ClearSpan h={changeHandlers.setDateModifiedEnd}/>}
            </div>
            <PopupDateBox
              value={dateModifiedEnd}
              onChangeHandler={changeHandlers.setDateModifiedEnd}
            />
          </div>

          <div className={styles.filterHeaderBlock}>
            <PopupCheckBox
              className={styles.label}
              value={isStarred}
              onChangeHandler={changeHandlers.setIsStarred}
            >
              Show starred only
            </PopupCheckBox>
          </div>

          <div className={styles.filterHeaderBlock}>
            <PopupCheckBox
              className={styles.label}
              value={isRecent}
              onChangeHandler={changeHandlers.setIsRecent}
            >
              Recents only
            </PopupCheckBox>
          </div>

        </div>
      </div>
    </div>
  );
};

export { Search };
