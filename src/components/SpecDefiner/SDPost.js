import React from "react";
import SDForm from "./SDForm";
import styles from "./SDPost.less";

const SDPost = ({ onSubmit, className }) =>
  <div className={className}>

    <SDForm
      className={styles.fieldsForm}
      onSubmit={onSubmit}
    />

  </div>;

SDPost.propTypes = {
  className : React.PropTypes.string,
  onSubmit  : React.PropTypes.func,
};

export { SDPost };
