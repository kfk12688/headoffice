/**
 * Created by sharavan on 21/05/16.
 */
import * as React from "react";
import "./Popup.less";

const PopupDateBox: React.StatelessComponent<{}> = (props) => {
  return <div className="ho-popup-text-box">
    <input
      type="date"
      className="input"
    />
  </div>
}

export { PopupDateBox }
