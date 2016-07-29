import React, { Component } from "react";
import { SearchBox, PopupDateBox, PopupCheckBox, PopupSearchBox } from "components";
import cx from "classnames";
import styles from "./Search.less";

const ClearSpan = ({ h }) => <span className={styles.clear} onClick={h}>Clear</span>;
ClearSpan.propTypes = {
  h : React.PropTypes.func.isRequired,    // The handler function for clearing the data
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.getSearchElements = this.getSearchElements.bind(this);
  }

  getSearchElements(config) {
    function getReactElement(type, value, handler, label) {
      if (type === "datebox") {
        return (
          <div className={styles.filterHeaderBlock} key={label}>
            <div>
              <span className={styles.label}>{label}</span>
              {(value !== undefined) && value.isValid() && <ClearSpan h={handler}/>}
            </div>
            <PopupDateBox
              value={value}
              onChangeHandler={handler}
            />
          </div>
        );
      }

      if (type === "searchbox") {
        return (
          <div className={styles.filterHeaderBlock} key={label}>
            <div>
              <span className={styles.label}>{label}</span>
              {(value !== undefined) && <ClearSpan h={handler}/>}
            </div>
            <PopupSearchBox
              value={value}
              onChangeHandler={handler}
              matchParentWidth
            />
          </div>
        );
      }

      if (type === "checkbox") {
        return (
          <div className={styles.filterHeaderBlock} key={label}>
            <PopupCheckBox
              className={styles.label}
              value={value}
              onChangeHandler={handler}
            >
              {label}
            </PopupCheckBox>
          </div>
        );
      }

      return null;
    }

    return config.map(
      ({ data, label, changeHandler, type }) => getReactElement(type, data, changeHandler, label)
    );
  }

  render() {
    const { className, config } = this.props;

    return (
      <div className={cx(styles.base, className)}>
        <div className={styles.searchbox}>
          <SearchBox />
        </div>
        <div>
          <div className={styles.filterHeader}>General Filters</div>
          <div className={styles.filterHeaderBlock}>
            {this.getSearchElements(config)}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  className : React.PropTypes.string,
  config    : React.PropTypes.number,
};

export { Search };
