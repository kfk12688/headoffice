/**
 * Created by sharavan on 21/05/16.
 */

import * as React from "react";
import "font-awesome-webpack";
import "./Button.less";
let FontAwesome: any = require("react-fontawesome");

interface IProps {
  placeHolder: boolean | string;
}

class SearchBox extends React.Component <IProps, {}> {
  render(): JSX.Element {
    let placeHolder = "";
    if (typeof this.props.placeHolder === "string") {
      placeHolder = this.props.placeHolder as string;
    } else if (typeof this.props.placeHolder === "boolean") {
      placeHolder = this.props.placeHolder ? "Search" : "";
    }

    return (
      <div className="ho-search-btn">
        <input className="ho-search-btn-input" placeholder={placeHolder}/>
        <FontAwesome
          className="ho-search-btn-fa-icon"
          name="search"
        />
      </div>
    );
  }
}

export { SearchBox }


