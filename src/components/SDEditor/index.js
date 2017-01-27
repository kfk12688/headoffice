import React from "react";
import SDForm from "./SDForm";
import styles from "./styles.less";

const SDEditor = (props) => {
  const { initialValues, onSubmit, isLoading } = props;

  return (
    <div className={styles.sdContainer}>
      <SDForm initialValues={initialValues || {}} onSubmit={onSubmit}/>
    </div>
  );
};

SDEditor.propTypes = {};
export { SDEditor };
