/**
 * Created by sharavan on 15/09/16.
 */
import React from "react";

const Logo = ({ size, light }) => {
  if (light) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size} height={size} viewBox="0 0 24 24"
      >
        <g>
          <path strokeOpacity="0" id="svg_2" fill="#ffffff"
                d="m23.49944,4.79977l-4,0l0,-4l-3,0l0,4l-4,0l0,3l4,0l0,4l3,0l0,-4l4,0l0,-3zm-8,8l0,0"
                stroke="#000000"
          />
          <path strokeOpacity="0" fill="#ffffff" id="svg_1"
                d="m16.60068,13l-6,0l0,-6l-4,0l0,6l-6,0l0,4l6,0l0,6l4,0l0,-6l6,0l0,-4z"
                stroke="#000000"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size} height={size} viewBox="0 0 24 24"
    >
      <path id="svg_2" fill="url(#svg_6)"
            d="m24 5l-4 0 0-4 -3 0 0 4 -4 0 0 3 4 0 0 4 3 0 0-4 4 0 0-3zM16 13 16 13"
      />
      <path fill="url(#svg_7)" id="svg_1"
            d="m16 13l-6 0 0-6 -4 0 0 6 -6 0 0 4 6 0 0 6 4 0 0-6 6 0 0-4z"
      />
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
    </svg>
  );
};

Logo.propTypes = {
  size  : React.PropTypes.string.isRequired,
  light : React.PropTypes.bool,
};

export default Logo;
