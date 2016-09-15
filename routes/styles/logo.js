/**
 * Created by sharavan on 15/09/16.
 */
import React from "react";

const Logo = ({ size }) =>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={size} height={size} viewBox="0 0 24 24"
  >
    <path id="svg_2" fill="url(#svg_6)" d="m24 5l-4 0 0-4 -3 0 0 4 -4 0 0 3 4 0 0 4 3 0 0-4 4 0 0-3zM16 13 16 13"/>
    <path fill="url(#svg_7)" id="svg_1" d="m16 13l-6 0 0-6 -4 0 0 6 -6 0 0 4 6 0 0 6 4 0 0-6 6 0 0-4z"/>
    <defs>
      <linearGradient y2="0" x2="1" y1="1" x1="0" id="svg_6">
        <stop offset="0" stopOpacity="1" stopColor="#333333"/>
        <stop offset="1" stopOpacity="1" stopColor="#b2b2b2"/>
      </linearGradient>
      <linearGradient y2="0" x2="1" y1="1" x1="0" spreadMethod="pad" id="svg_7">
        <stop offset="0" stopOpacity="1" stopColor="#ff7f7f"/>
        <stop offset="1" stopOpacity="1" stopColor="#d61717"/>
      </linearGradient>
    </defs>
  </svg>;

Logo.propTypes = {
  size : React.PropTypes.string.isRequired,
};

export default Logo;
