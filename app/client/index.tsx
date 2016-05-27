import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/lib.less";
import {
  Grid,
  Row,
  Col,
  Divider,
} from "../components";
import { MainNavContainer } from "./MainNavContainer";
import { TabContainer } from "./TabContainer";
import { ActionContainer } from "./ActionContainer";
import { DataGridContainer } from "./DataGridContainer";
import { SearchContainer } from "./SearchContainer";

class HOApp extends React.Component <{}, {}> {
  render(): JSX.Element {
    return (
      <Grid>
        <MainNavContainer></MainNavContainer>
        <TabContainer></TabContainer>
        <Divider size={6} fullSpan></Divider>
        <ActionContainer></ActionContainer>
        <Divider fullSpan></Divider>
        <Row fullWidth className="content-container">
          <Col className="search-container">
            <SearchContainer></SearchContainer>
          </Col>
          <Col className="data-container">
            <DataGridContainer></DataGridContainer>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ReactDOM.render(
  <HOApp />,
  document.getElementById("HOApp")
);
