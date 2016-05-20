import * as moment from "moment";

function formatBytes(bytes: number, decimals: number): string {
  if (bytes === 0) {
    return "0 Byte";
  }

  let k     = 1000; // or 1024 for binary
  let dm    = decimals + 1 || 1;
  let sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let i     = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function formatDate(date: string, format?: string): string {
  let formatString = format || "Mo MMM YYYY, HH:mm";
  return moment.utc(date, moment.ISO_8601).format(formatString);
}

export { formatBytes, formatDate };
