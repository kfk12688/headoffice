import React from "react";
import styles from "./SearchInput.less";
import cx from "classnames";

const SearchInput = ({ className, placeHolder, field }) => {
  if (typeof placeHolder === "boolean") placeHolder = placeHolder ? "Search" : "";

  return (
    <div className={className || styles.box}>
      <input
        className={styles.input}
        placeholder={placeHolder}
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
