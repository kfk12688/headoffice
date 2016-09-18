import React from "react";
import styles from "./SearchInput.less";
import cx from "classnames";

const SearchInput = ({ className, placeHolder, field }) => {
  let computedPlaceHolder = placeHolder || "";
  if (typeof placeHolder === "boolean") computedPlaceHolder = "Search";

  return (
    <div className={className || styles.box}>
      <input
        className={styles.input}
        placeholder={computedPlaceHolder}
        {...field}
      />
      <i className={cx("fa fa-search", styles.icon)}/>
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
