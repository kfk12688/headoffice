import Formatter from "../components/Utils/Formatter";
import { IColProps } from "../components/DataGrid/DGTypes";

export let userCols = [
  {
    headerStyle: { borderRight: 0 },
    name       : "has-alert-col",
    renderType : "checkbox",
    sortable   : false,
    text       : "",
  },
  {
    dataKey   : "displayName",
    name      : "display-name-col",
    renderType: "link",
    text      : "Display Name",
    linkRef : {
      path : "/users",
      urlKey : "username",
    },
  },
  {
    dataKey: "username",
    name   : "user-name-col",
    text   : "User Name",
  },
  {
    dataKey: "siteRole",
    name   : "site-role-col",
    text   : "Site Role",
  },
  {
    dataKey   : "groupCount",
    name      : "groups-count-col",
    renderType: "number",
    text      : "Groups",
  },
  {
    cellFormatter: Formatter.toDate,
    dataKey      : "lastSignIn",
    name         : "last-signin-col",
    renderType   : "date",
    sortable     : true,
    text         : "Last Signed In",
  },
];

export let userColWidths = {
  "has-alert-col"   : 38,
  "display-name-col": 160,
  "user-name-col"   : 160,
  "site-role-col"   : 140,
  "groups-count-col": 80,
  "last-signin-col" : 150,
};

export const usersData = [{
  "authSetting"                      : "DEFAULT",
  "lastSignIn"                       : "2016-06-08T02:39:54.267Z",
  "groupCount"                       : 1,
  "siteRole"                         : "SiteAdministrator",
  "refreshFailureNotificationEnabled": true,
  "id"                               : "30013",
  "displayName"                      : "Sharavanth R",
  "username"                         : "shravan@trbvn.com",
  "domainName"                       : "external",
}, {
  "authSetting"                      : "DEFAULT",
  "lastSignIn"                       : "2016-06-08T02:39:54.267Z",
  "groupCount"                       : 1,
  "siteRole"                         : "User",
  "refreshFailureNotificationEnabled": true,
  "id"                               : "30014",
  "displayName"                      : "BalaSubramanian N",
  "username"                         : "bala@trbvn.com",
  "domainName"                       : "external",
}, {
  "authSetting"                      : "DEFAULT",
  "lastSignIn"                       : "2016-06-08T02:39:54.267Z",
  "groupCount"                       : 1,
  "siteRole"                         : "User",
  "refreshFailureNotificationEnabled": true,
  "id"                               : "30015",
  "displayName"                      : "Avinesh Ram",
  "username"                         : "falcon@trbvn.com",
  "domainName"                       : "external",
}];
