/**
 * Created by sharavan on 15/05/16.
 */
import * as React from "react";
import {
  Row,
  Col,
  Button,
  Divider,
} from "../components";
import { grey50 } from "./styles/colors";

interface IProps {
}

interface IState {
}

class ActionContainer extends React.Component <IProps, IState> {
  render(): JSX.Element {
    return (
      <Row fullWidth style={{ backgroundColor: grey50, padding: "5.5px 0" }}>
        <Row>
          <Col size={6}>
            <span>
              <Button>III</Button>
              <Button>0 selected</Button>
            </span>
            <span>
              <Divider vertical size={{h:21, w:1}} style={{ marginLeft: 6, marginRight:10 }}></Divider>
              <Button>Actions</Button>
            </span>
          </Col>
          <Col size={6} style={{ textAlign : "right" }}>
            <span>Sort by : <Button>A-Z</Button></span>
          </Col>
        </Row>
      </Row>
    );
  }
}

export { ActionContainer };
