/**
 * Created by sharavan on 16/06/16.
 */
import moment from "moment";
import _ from "underscore";

class FilterHelpers {
  static filter(bindings, item, filter) {
    return this.dateFilter(bindings.dateFilter, item, filter) &&
      this.textFilter(bindings.textFilter, item, filter) &&
      this.recentFilter(bindings.recentFilter, item, filter) &&
      this.favoriteFilter(bindings.favoriteFilter, item, filter);
  }

  static dateFilter(key, item, filter) {
    const oDate = moment(item[key]);
    let { dateModifiedStart, dateModifiedEnd } = filter;
    dateModifiedStart = dateModifiedStart ? moment(dateModifiedStart) : "";
    dateModifiedEnd = dateModifiedEnd ? moment(dateModifiedEnd) : "";

    if (dateModifiedStart && dateModifiedEnd &&
      (dateModifiedStart.isValid()) &&
      (dateModifiedEnd.isValid())) {
      return (
        oDate.isBefore(dateModifiedEnd) && oDate.isAfter(dateModifiedStart) ||
        (oDate.isSame(dateModifiedStart, "day") || oDate.isSame(dateModifiedEnd, "day"))
      );
    } else if (dateModifiedStart && dateModifiedStart.isValid()) {
      return (oDate.isAfter(dateModifiedStart) || oDate.isSame(dateModifiedStart, "day"));
    } else if (dateModifiedEnd && dateModifiedEnd.isValid()) {
      return (oDate.isBefore(dateModifiedEnd) || oDate.isSame(dateModifiedEnd, "day"));
    }
    return true;
  }

  static textFilter(key, item, filter) {
    if (filter.owner === undefined) return true;

    const pattern = new RegExp(item[key], "gi");
    return pattern.test(filter.owner);
  }

  static favoriteFilter(key, item, filter) {
    if (filter.isStarred) {
      return item[key];
    }
    return true;
  }

  static recentFilter(key, item, filter) {
    if (filter.isRecent) {
      const oDate = moment(item[key]);
      const timeSpan = moment().subtract(20, "days");

      return (oDate.isAfter(timeSpan) || oDate.isSame(timeSpan));
    }
    return true;
  }

  static sortFilter(data, { sortAscending, sortKey }) {
    if (sortAscending) {
      return data
        .sort((a, b) => +(a[sortKey] > b[sortKey]) || +(a[sortKey] === b[sortKey]) - 1);
    }
    return data
      .sort((a, b) => +(a[sortKey] < b[sortKey]));
  }
}

function getRows(data, appliedFilters, bindings) {
  const sortAndFiltData = {};
  const filteredKeys = Object.keys(data);

  _.forEach(data, (row, rowKey) => {
    if (!FilterHelpers.filterStore(bindings, row, appliedFilters)) {
      filteredKeys.splice(filteredKeys.indexOf(rowKey), 1);
    }
  });

  FilterHelpers.sortFilter(
    filteredKeys.map(key => data[key]),
    {
      sortAscending : appliedFilters.sortAscending,
      sortKey       : appliedFilters.sortKey,
    }
  ).forEach(obj => {
    sortAndFiltData[obj.id] = obj;
  });

  return sortAndFiltData;
}

export { getRows };
export { Formatter } from "./Formatter";