/**
 * Created by sharavan on 15/05/16.
 */
import * as React from "react";
import {
  Col,
  DatePicker,
  Divider,
} from "../components";

interface IProps {
}

interface IState {
}

class SearchContainer extends React.Component <IProps, IState> {
  render(): JSX.Element {
    const colStyle = {
      bottom    : 0,
      paddingTop: 10,
      position  : "absolute",
      top       : 139,
    };

    const dividerStyle = {
      bottom  : 0,
      position: "absolute",
      right   : 0,
      top     : 0,
    };

    return (
      <Col size={2} style={colStyle}>
        <div style={{padding: "10px 0"}}>
          <input type="text"/>
        </div>
        <Divider fullSpan size={1}/>
        <div>
          <div className="general-filter-heading">General Filters</div>
          <div className="general-filter-elements">
            <div>Owner</div>
            <div><input type="text"/></div>
            <div>Created on or after</div>
            <DatePicker/>
            <div>Created on or before</div>
            <DatePicker/>
          </div>
        </div>
        <Divider vertical style={dividerStyle} size={{h:"auto", w:3}}></Divider>
      </Col>
    );
  }
}

export { SearchContainer }


