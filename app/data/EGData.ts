import { IEGRows, IEGCols } from "components/EntryGrid/EGTypes";

export const colSpec: IEGCols = {
  "action"        : {
    "headerStyle": { borderLeft: 0 },
    "displayText": "",
    "renderType" : "action",
    "actions"    : {},
    "sortable"   : false,
    "insertable" : false
  },
  "fieldName"     : {
    "displayText": "Field Name",
    "renderType" : "text"
  },
  "fieldReference": {
    "colStyle"      : { fontSize: 12 },
    "displayText"   : "Reference to field",
    "renderType"    : "reference",
    "refTableSource": [
      { "key": 0, "val": "XXX" },
      { "key": 1, "val": "YYY" },
      { "key": 2, "val": "ZZZ" }
    ],
    "refFieldSource": [
      { "key": 0, "val": "aInXXX" },
      { "key": 1, "val": "bInXXX" },
      { "key": 2, "val": "cInXXX" }
    ]
  },
  "fieldType"     : {
    "displayText": "Field Type",
    "renderType" : "list",
    "source"     : [
      { "key": 0, "val": "Text" },
      { "key": 1, "val": "Decimal" },
      { "key": 2, "val": "Date" },
      { "key": 3, "val": "Time" },
      { "key": 4, "val": "List" }
    ]
  },
  "fieldValue"    : {
    "displayText": "Field Value",
    "renderType" : "text"
  },
};
export const data: IEGRows    = {
  "11331": {
    "fieldName"     : {
      "val"       : "Production",
      "isEditable": true
    },
    "fieldReference": {
      "val"       : {
        "refTable": { "key": 0, "name": "XXX" },
        "refField": { "key": 1, "name": "bInXXX" }
      },
      "isEditable": true
    },
    "fieldType"     : {
      "val"       : {
        "key" : 0,
        "name": "Text"
      },
      "isEditable": false
    },
    "fieldValue"    : {
      "val"       : "undefined",
      "isEditable": false
    }
  },
  "11332": {
    "fieldName"     : {
      "val"       : "Production",
      "isEditable": true
    },
    "fieldReference": {
      "val"       : {
        "refTable": { "key": 0, "name": "XXX" },
        "refField": { "key": 0, "name": "aInXXX" },
      },
      "isEditable": true
    },
    "fieldType"     : {
      "val"       : {
        "key" : 0,
        "name": "Text"
      },
      "isEditable": false
    },
    "fieldValue"    : {
      "val"       : "undefined",
      "isEditable": false
    }
  },
  "11333": {
    "fieldName"     : {
      "val"       : "Production",
      "isEditable": true
    },
    "fieldReference": {
      "val"       : {
        "refTable": { "key": 1, "name": "YYY" },
        "refField": { "key": 2, "name": "cInXXX" }
      },
      "isEditable": true
    },
    "fieldType"     : {
      "val"       : {
        "key" : 0,
        "name": "Text"
      },
      "isEditable": false
    },
    "fieldValue"    : {
      "val"       : "undefined",
      "isEditable": false
    }
  }
};
