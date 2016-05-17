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
import { SearchContainer } from "./SearchContainer";

interface IState {
  /**
   * Manages the checkbox state
   */
  checked: boolean;
}

class HOApp extends React.Component <{}, IState> {
  state: IState = {
    checked: false,
  };

  constructor(props: {}) {
    super(props);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  render(): JSX.Element {
    const contentContainerStyle = {
      margin : 0,
      padding: 0,
    };

    return (
      <Grid>
        <MainNavContainer></MainNavContainer>
        <TabContainer></TabContainer>
        <Divider size={6} fullSpan></Divider>
        <ActionContainer></ActionContainer>
        <Divider fullSpan></Divider>
        <Row style={contentContainerStyle}>
          <SearchContainer></SearchContainer>
          <Col size={10} style={{position: "absolute", right: 0}}>
          </Col>
        </Row>
      </Grid>
    );
  }

  private handleCheckboxChange: React.MouseEventHandler = (event: React.MouseEvent) => {
    let target: any = event.target;
    this.setState({
      checked: target.checked,
    });
  }
}

ReactDOM.render(
  <HOApp />,
  document.getElementById("HOApp")
);
