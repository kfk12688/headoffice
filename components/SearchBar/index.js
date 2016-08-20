import React, { Component } from "react";
import { SearchInput, CheckBoxInput, ListInput, DateInput } from "components";
import cx from "classnames";
import styles from "./SearchBar.less";

const ClearSpan = ({ h }) => <span className={styles.clear} onClick={h}>Clear</span>;
ClearSpan.propTypes = {
  h : React.PropTypes.func.isRequired,    // The handler function for clearing the data
};

class SearchBar extends Component {
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
            <DateInput
              className={styles.dateInput}
              field={{ value, onChange : handler }}
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
            <ListInput
              matchParentWidth
              field={{ value, onChange : handler }}
            />
          </div>
        );
      }

      if (type === "checkbox") {
        return (
          <div className={styles.filterHeaderBlock} key={label}>
            <CheckBoxInput
              className={styles.label}
              field={{ value, onChange : handler }}
            >
              {label}
            </CheckBoxInput>
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
          <SearchInput />
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

SearchBar.propTypes = {
  className : React.PropTypes.string,
  config    : React.PropTypes.array,
};

export { SearchBar };
