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
import { white, whiteLightest, blackDark } from "../components/internal/styles/colors";


interface IProps {
}

interface IState {
}

class MainNavContainer extends React.Component <IProps, IState> {
  render(): JSX.Element {
    const primaryRowStyle = {
      backgroundColor: blackDark,
      color          : whiteLightest,
    };

    return (
      <Row fullWidth style={primaryRowStyle}>
        <Row>
          <Col size={3}>
            <div style={{padding: 4}}> Head Office App</div>
          </Col>
          <Col size={9} style={{ textAlign : "right" }}>
            <TabGroup color={white} hoverColor={whiteLightest}>
              <Tab>Alerts</Tab>
              <Tab>Help</Tab>
              <Tab>Sharavanth R</Tab>
            </TabGroup>
          </Col>
        </Row>
        <Row>
          <Col size={12}>
            <TabGroup color={white} hoverColor={whiteLightest}>
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
