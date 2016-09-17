import moment from "moment";

class Formatter {
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

    const k = 1000; // or 1024 for binary
    const dm = decimals + 1 || 1;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  /**
   * Convert a UTC date string to the desired format
   * @param date - the date string to be converted
   * @param format - the format string
   * @returns {any} - converted date string
   */
  static toDate(format, date) {
    const formatString = format || "D MMM YYYY, HH:mm";
    return moment(date).format(formatString);
  }
}

export { Formatter };
