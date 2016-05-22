/**
 * Created by sharavan on 18/05/16.
 */
import * as React from "react";
import {
  DataGrid,
} from "../components";
import { formatBytes, formatDate } from "../components/utils";

interface IProps {
}

interface IState {
}

let cols = [
  {
    headerStyle: { borderRight: 0 },
    name       : "has-alert-col",
    renderType : "checkbox",
    sortable   : false,
    text       : "",
  },
  {
    dataKey    : "isFavorite",
    headerStyle: { borderRight: 0 },
    name       : "favorite-col",
    renderType : "favorite",
    sortable   : false,
    text       : "",
  },
  {
    dataKey: "name",
    name   : "name-col",
    text   : "Name",
  },
  {
    dataKey   : "sheetCount",
    name      : "sheet-count-col",
    renderType: "number",
    text      : "Sheets",
  },
  {
    cellFormatter: formatBytes,
    dataKey      : "size",
    name         : "size-col",
    renderType   : "number",
    text         : "Size",
  },
  {
    dataKey   : "ownerId",
    name      : "owner-id-col",
    renderType: "number",
    sortable  : false,
    text      : "Owner ID",
  },
  {
    cellFormatter : formatDate,
    dataKey   : "updatedAt",
    headerStyle : { borderRight : 0 },
    name      : "updated-at-col",
    renderType: "date",
    sortable  : true,
    text      : "Updated At",
  },
];
let data = [
  {
    "name"          : "Analyze Superstore",
    "id"            : "1027905",
    "size"          : 1088355,
    "isFavorite"    : true,
    "usageInfo"     : {
      "hitsTotal"                : 0,
      "favoritesTotal"           : 0,
      "hitsLastTwelveMonthsTotal": 0,
      "hitsLastThreeMonthsTotal" : 0,
      "hitsLastOneMonthTotal"    : 0,
      "subscriptionsTotal"       : 0,
    },
    "ownerId"       : "160907",
    "updatedAt"     : "2014-05-16T13:24:36",
    "displayTabs"   : true,
    "repositoryUrl" : "AnalyzeSuperstore",
    "defaultViewUrl": "AnalyzeSuperstore/Overview",
    "projectId"     : "38370",
    "sheetCount"    : 7,
    "defaultViewId" : "3442244",
    "thumbnailUrl"  : "vizportal/api/rest/v1/workbooks/1027905/thumbnail?1463405076526",
    "hasAlert"      : false,
    "hasExtracts"   : false,
    "downloadUrl"   : "/t/sss/workbooks/AnalyzeSuperstore.twb",
  },
  {
    "name"                 : "Google Analytics",
    "id"                   : "1027903",
    "size"                 : 237618,
    "usageInfo"            : {
      "hitsTotal"                : 0,
      "favoritesTotal"           : 0,
      "hitsLastTwelveMonthsTotal": 0,
      "hitsLastThreeMonthsTotal" : 0,
      "hitsLastOneMonthTotal"    : 0,
      "subscriptionsTotal"       : 0,
    },
    "ownerId"              : "160907",
    "updatedAt"            : "2016-02-16T13:24:25",
    "displayTabs"          : true,
    "repositoryUrl"        : "GoogleAnalytics",
    "defaultViewUrl"       : "GoogleAnalytics/OverallTrends",
    "projectId"            : "38370",
    "sheetCount"           : 2,
    "hasIncrementalExtract": false,
    "defaultViewId"        : "3442237",
    "thumbnailUrl"         : "vizportal/api/rest/v1/workbooks/1027903/thumbnail?1463405065417",
    "hasAlert"             : false,
    "hasExtracts"          : true,
    "downloadUrl"          : "/t/sss/workbooks/GoogleAnalytics.twb",
  },
  {
    "name"                 : "Executive Salesforce",
    "id"                   : "1027904",
    "size"                 : 846983,
    "usageInfo"            : {
      "hitsTotal"                : 0,
      "favoritesTotal"           : 0,
      "hitsLastTwelveMonthsTotal": 0,
      "hitsLastThreeMonthsTotal" : 0,
      "hitsLastOneMonthTotal"    : 0,
      "subscriptionsTotal"       : 0,
    },
    "ownerId"              : "160907",
    "updatedAt"            : "2016-02-19T13:24:30",
    "displayTabs"          : true,
    "repositoryUrl"        : "ExecutiveSalesforce",
    "defaultViewUrl"       : "ExecutiveSalesforce/SalesSummary",
    "projectId"            : "38370",
    "sheetCount"           : 5,
    "hasIncrementalExtract": false,
    "defaultViewId"        : "3442239",
    "thumbnailUrl"         : "vizportal/api/rest/v1/workbooks/1027904/thumbnail?1463405070512",
    "hasAlert"             : false,
    "hasExtracts"          : true,
    "downloadUrl"          : "/t/sss/workbooks/ExecutiveSalesforce.twb",
  },
];

class DataGridContainer extends React.Component <IProps, IState> {
  render(): JSX.Element {
    return (
      <DataGrid
        cols={cols}
        rows={data}
        selectedKeys={{}}
      />
    );
  }
}

export { DataGridContainer };
