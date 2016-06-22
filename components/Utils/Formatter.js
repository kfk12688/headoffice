import moment from "moment";

export default class Formatter {
  /**
   * Convert a number to Bytes
   * @param bytes - base value to be converted
   * @param decimals - the number of significant decimals in the output
   * @returns {any} - the converted string
   */
  static toBytes(bytes, decimals):string {
    if (bytes === 0) {
      return "0 Byte";
    }

    let k = 1000; // or 1024 for binary
    let dm = decimals + 1 || 1;
    let sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  /**
   * Convert a UTC date string to the desired format
   * @param date - the date string to be converted
   * @param format - the format string
   * @returns {any} - converted date string
   */
  static toDate(date, format) {
    let formatString = format || "D MMM YYYY, HH:mm";
    return moment(date).format(formatString);
  }
}
