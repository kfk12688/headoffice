/**
 * Created by sharavan on 15/05/16.
 */
import * as React from "react";
import {
  Row,
  Col,
  Button,
  Divider,
  PopupButton,
  PopupTextBox,
} from "../components";

interface IProps {
}

interface IState {
}

class ActionContainer extends React.Component <IProps, IState> {
  render(): JSX.Element {
    return (
      <Row fullWidth className="ho-action-cont">
        <Row>
          <Col size={6} className="left">
            <span>
              <Button faName="navicon" className="icon"/>
              <PopupButton label="0 selected">
                <div>Select All</div>
                <div>Clear selection</div>
              </PopupButton>
            </span>
            <span>
              <Divider vertical size={{h:22, w:1}} style={{ marginLeft: 6, marginRight:10 }}></Divider>
              <PopupButton label="Actions">
                <div>Edit Template</div>
                <div>Tag...</div>
                <div>Set Permissions</div>
              </PopupButton>
            </span>
          </Col>
          <Col size={6} className="right">
            <span>Sort by : </span>
            <span className="sort-block">
              <PopupTextBox matchParentWidth label="Name (A-Z)">
                <div>Name (Z-A)</div>
                <div>Count (least-most)</div>
                <div>Count (most-least)</div>
                <div>Date Modified (old - new)</div>
                <div>Date Modified (new - old)</div>
              </PopupTextBox>
            </span>
            <span>
              <Button faName="th" className="icon"/>
              <Button faName="th-list" className="icon"/>
            </span>
          </Col>
        </Row>
      </Row>
    );
  }
}

export { ActionContainer };
