import React, { Component } from "react";
import moment from "moment";
import { SearchInput, CheckBoxInput, SelectInput, DateInput } from "components";
import styles from "./index.less";
import cx from "classnames";

const ClearSpan = ({ h }) => <span className={cx("pull-right", styles.clear)} onClick={h.bind(this, "")}>Clear</span>;
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
          <div key={label}>
            <div>
              <span>{label}</span>
              {value && moment(value).isValid() && <ClearSpan h={handler}/>}
            </div>
            <DateInput input={{ value, onChange : handler }}/>
          </div>
        );
      }

      if (type === "searchbox") {
        return (
          <div key={label}>
            <div>
              <span>{label}</span>
              {value && <ClearSpan h={handler}/>}
            </div>
            <SelectInput
              matchParentWidth
              input={{ value, onChange : handler }}
              api="/api/"
            />
          </div>
        );
      }

      if (type === "checkbox") {
        return (
          <div key={label}>
            <CheckBoxInput input={{ value, onChange : handler }}>
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
      <div className={className} style={{ margin : "15px 0" }}>
        <SearchInput/>
        <div className={styles.filterHeader}>General Filters</div>
        <div className={styles.filterHeaderBlock}>{this.getSearchElements(config)}</div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  className : React.PropTypes.string,
  config    : React.PropTypes.array,
};

export { SearchBar };
