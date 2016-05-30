/**
 * Created by sharavan on 15/05/16.
 */
import * as React from "react";
import { Row, Col, TabGroup, Tab, NavLink } from "components";
import "font-awesome-webpack";
let cx: any = require("classnames");

interface IProps {
  rollUp: boolean;
}

class NavContainer extends React.Component <IProps, {}> {
  render(): JSX.Element {
    return (
      <Row
        fullWidth
        className={ cx("ho-nav-container", { "rolled-up" : this.props.rollUp })}
      >
        <Row className="row">
          <Col size={5}>
            <div className="brand"> Head Office App</div>
          </Col>
          <Col size={7} style={{ float : "right", textAlign: "right" }}>
            <TabGroup childClassName="link">
              <Tab>Alerts</Tab>
              <Tab>Help</Tab>
              <Tab>Sharavanth R</Tab>
            </TabGroup>
          </Col>
        </Row>
        <Row className="row">
          <Col size={12}>
            <TabGroup childClassName="link">
              <Tab><NavLink to="/template">Template</NavLink></Tab>
              <Tab><NavLink to="/content">Content</NavLink></Tab>
              <Tab><NavLink to="/view">View</NavLink></Tab>
              <Tab><NavLink to="/users">Users</NavLink></Tab>
              <Tab><NavLink to="/groups">Groups</NavLink></Tab>
            </TabGroup>
          </Col>
        </Row>
      </Row>
    );
  }
}

export { NavContainer }
