/**
 * Created by sharavan on 15/05/16.
 */
import * as React from "react";
import {
  Row,
  Col,
  TabGroup,
  Tab,
} from "../components";
import { grey50, grey800, grey400 } from "./styles/colors";

interface IProps {
}

interface IState {
}

class MainNavContainer extends React.Component <IProps, IState> {
  render(): JSX.Element {
    const primaryRowStyle = {
      backgroundColor: grey800,
      color          : grey50,
    };

    return (
      <Row fullWidth style={primaryRowStyle}>
        <Row>
          <Col size={5}>
            <div className="ho-brand"> Head Office App</div>
          </Col>
          <Col size={7} style={{ float : "right", textAlign: "right" }}>
            <TabGroup className="ho-main-nav-header">
              <Tab>Alerts</Tab>
              <Tab>Help</Tab>
              <Tab>Sharavanth R</Tab>
            </TabGroup>
          </Col>
        </Row>
        <Row>
          <Col size={12}>
            <TabGroup className="ho-main-nav-header">
              <Tab>Templates</Tab>
              <Tab>Content</Tab>
              <Tab>Reports</Tab>
              <Tab>Users</Tab>
            </TabGroup>
          </Col>
        </Row>
      </Row>
    );
  }
}

export { MainNavContainer }
