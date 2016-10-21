import React from "react";
import styles from "./index.less";
import cx from "classnames";

const Pagination = ({ className, limit, activePage, setPage, setLimit }) => {
  const pageClickHandler = (e, pageIdx) => {
    e.preventDefault();
    setPage(pageIdx);
  };

  const limitChangeHandler = (e) => {
    e.preventDefault();
    setLimit(Number(e.target.value));
  };

  const generatePageLinks = (pages) => {
    const prevLink = (
      <li className={styles.pageItem}>
        <a className={styles.pageLink} href="#" onClick={e => pageClickHandler(e, "prev")} tabIndex="-1"
           aria-label="Previous"
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </a>
      </li>
    );

    const nextLink = (
      <li className={styles.pageItem}>
        <a className={styles.pageLink} href="#" onClick={e => pageClickHandler(e, "next")} tabIndex="-1"
           aria-label="Next"
        >
          <span aria-hidden="true">»</span>
          <span className="sr-only">Next</span>
        </a>
      </li>
    );

    const links = (noPages) => {
      const pageLinks = [];
      for (let idx = 1; idx <= noPages; idx++) {
        pageLinks.push(
          <li className={styles.pageItem}>
            <a
              className={cx(styles.pageLink, { [styles.pageLinkActive] : (activePage === idx) })}
              href="#"
              onClick={e => pageClickHandler(e, idx)}
            >
              {idx}
            </a>
          </li>
        );
      }
      return pageLinks;
    };

    return (
      <ul className={styles.pagination}>
        {prevLink}
        {links(pages)}
        {nextLink}
      </ul>
    );
  };

  const generateLimits = (limits) => {
    const options = limits.map(limitVal =>
      <option value={limitVal.toString()}>{limitVal}</option>
    );

    return (
      <select className={styles.limiter} value={limit} onChange={limitChangeHandler}>
        {options}
      </select>
    );
  };

  const limits = [15, 30, 50];
  const appliedClassName = cx(className, styles.container);
  return (
    <div className={appliedClassName}>
      {generatePageLinks(5)}
      {generateLimits(limits)}
    </div>
  );
};

Pagination.propTypes = {
  className  : React.PropTypes.string,
  limit      : React.PropTypes.number,
  activePage : React.PropTypes.number,
  setPage    : React.PropTypes.func,
  setLimit   : React.PropTypes.func,
};

export { Pagination };
