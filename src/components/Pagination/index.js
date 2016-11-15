import React from "react";
import cx from "classnames";
import styles from "./index.less";

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
      <li className="page-item">
        <a className="page-link" href="#" onClick={e => pageClickHandler(e, "prev")} tabIndex="-1"
           aria-label="Previous"
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </a>
      </li>
    );

    const nextLink = (
      <li className="page-item">
        <a className="page-link" href="#" onClick={e => pageClickHandler(e, "next")} tabIndex="-1"
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
          <li className={cx("page-item", { "active" : (activePage === idx) })}>
            <a
              href="#"
              tabIndex="-1"
              onClick={e => pageClickHandler(e, idx)}
              className="page-link"
            >
              {idx}
            </a>
          </li>
        );
      }
      return pageLinks;
    };

    return (
      <ul className="pagination">
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
      <select
        className={cx("pull-right", styles.limitContainer)}
        value={limit}
        onChange={limitChangeHandler}
        tabIndex="-1"
      >
        {options}
      </select>
    );
  };

  const limits = [15, 30, 50];
  return (
    <div className={className}>
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
