import React from "react";
import cx from "classnames";
import styles from "./SearchInput.less";

const SearchInput = ({ className, placeHolder, field }) => {
  let computedPlaceHolder = placeHolder || "Search";
  if (typeof placeHolder === "boolean") computedPlaceHolder = "Search";

  return (
    <div className={styles.searchBox}>
      <i className={cx("fa fa-search", styles.icon)}/>
      <input
        type="search"
        className="form-control"
        placeholder={computedPlaceHolder}
        {...field}
      />
    </div>
  );
};

SearchInput.propTypes = {
  placeHolder : React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  field       : React.PropTypes.object.isRequired,
  className   : React.PropTypes.string,
};

export { SearchInput } ;
