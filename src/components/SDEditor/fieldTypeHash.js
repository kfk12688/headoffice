import { filter } from "utils";

const FIELD_TYPES = [
  { label : "Number (whole)", value : "integer" },
  { label : "Number (decimal)", value : "decimal" },
  { label : "Text", value : "text" },
  { label : "Description Text", value : "longtext" },
  { label : "Boolean", value : "boolean" },
  { label : "List", value : "list" },
  { label : "Date", value : "date" },
  { label : "Time", value : "time" },
  { label : "Reference To", value : "reference" },
  { label : "Image/Photo", value : "image" },
  { label : "──────────", disabled : true },
  { label : "Embedded Fields", value : "schema" },
  { label : "Embedded Fields Array", value : "schemaArray" },
];

const SUB_FIELD_TYPES = filter(
  type => ((type.disabled !== true) && ((type.value !== "schema") && (type.value !== "schemaArray"))),
  FIELD_TYPES
);

export { FIELD_TYPES, SUB_FIELD_TYPES };
