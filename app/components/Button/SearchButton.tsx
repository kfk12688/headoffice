/**
 * Created by sharavan on 21/05/16.
 */

import * as React from "react";
import "font-awesome-webpack";
import "./Button.less";
let FontAwesome: any = require("react-fontawesome");

class SearchButton extends React.Component <{}, {}> {
  render(): JSX.Element {
    return (
      <div className="ho-search-btn">
        <input className="ho-search-btn-input"/>
        <FontAwesome
          className="ho-search-btn-fa-icon"
          name="search"
        />
      </div>
    );
  }
}

export { SearchButton }


