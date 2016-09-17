import React, { Component } from "react";
import moment from "moment";
import { SearchInput, CheckBoxInput, ComboInput, DateInput } from "components";
import cx from "classnames";
import styles from "./SearchBar.less";

const ClearSpan = ({ h }) => <span className={styles.clear} onClick={h.bind(this, "")}>Clear</span>;
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
              {value && moment(value).isValid() && <ClearSpan h={handler}/>}
            </div>
            <DateInput
              className={styles.inputContainer}
              input={{ value, onChange : handler }}
            />
          </div>
        );
      }

      if (type === "searchbox") {
        return (
          <div className={styles.filterHeaderBlock} key={label}>
            <div>
              <span className={styles.label}>{label}</span>
              {value && <ClearSpan h={handler}/>}
            </div>
            <ComboInput
              className={styles.inputContainer}
              matchParentWidth
              input={{ value, onChange : handler }}
              list={[]}
            />
          </div>
        );
      }

      if (type === "checkbox") {
        return (
          <div className={styles.filterHeaderBlock} key={label}>
            <CheckBoxInput
              className={styles.label}
              input={{ value, onChange : handler }}
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
