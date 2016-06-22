/**
 * Created by sharavan on 16/06/16.
 */
import moment from "moment";

class FilterHelpers {
  static filter(bindings, item, filter) {
    return this.dateFilter(bindings.dateFilter, item, filter) &&
      this.textFilter(bindings.textFilter, item, filter) &&
      this.recentFilter(bindings.recentFilter, item, filter) &&
      this.favoriteFilter(bindings.favoriteFilter, item, filter);
  }

  static dateFilter(key, item, filter) {
    const oDate = moment(item[key]);

    if ((filter.dateModifiedStart.isValid()) && (filter.dateModifiedEnd.isValid())) {
      return (
        oDate.isBefore(filter.dateModifiedEnd) && oDate.isAfter(filter.dateModifiedStart) ||
        (oDate.isSame(filter.dateModifiedStart, "day") || oDate.isSame(filter.dateModifiedEnd, "day"))
      );
    } else if (filter.dateModifiedStart.isValid()) {
      return (oDate.isAfter(filter.dateModifiedStart) || oDate.isSame(filter.dateModifiedStart, "day"));
    } else if (filter.dateModifiedEnd.isValid()) {
      return (oDate.isBefore(filter.dateModifiedEnd) || oDate.isSame(filter.dateModifiedEnd, "day"));
    }
    return true;
  }

  static textFilter(key, item, filter) {
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
    } else {
      return data
        .sort((a, b) => +(a[sortKey] < b[sortKey]));
    }
  }
}

function getRows(data, appliedFilters) {
  const filteredKeys = Object.keys(data);
  const bindings = {
    dateFilter     : "updatedAt",
    textFilter     : "owner",
    recentFilter   : "updatedAt",
    favoriteFilter : "isFavorite",
  };

  for (const rowKey in data) {
    const row = data[rowKey];
    if (!FilterHelpers.filter(bindings, row, appliedFilters)) {
      filteredKeys.splice(filteredKeys.indexOf(rowKey), 1);
    }
  }

  return FilterHelpers.sortFilter(
    filteredKeys.map(key => data[key]),
    {
      sortAscending : appliedFilters.sortAscending,
      sortKey   : appliedFilters.sortKey,
    }
  );
}

export { FilterHelpers as fh, getRows };
