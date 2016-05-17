/**
 * Created by sharavan on 15/05/16.
 */
import * as React from "react";
import {
  Row,
  Col,
  TabGroup,
  TabMeta,
} from "../components";
import { blackLight, blackDark } from "../components/internal/styles/colors";

interface IProps {
}

interface IState {
}

class TabContainer extends React.Component <IProps, IState> {
  render(): JSX.Element {
    const rowStyle = {
      paddingBottom : 0,
    };

    return (
      <Row fullWidth style={rowStyle}>
        <Row style={rowStyle}>
          <Col size={12}>
            <TabGroup color={blackLight} hoverColor={blackDark}>
              <TabMeta meta={{ count: 3 }}>Groups</TabMeta>
              <TabMeta meta={{ count: 10 }}>Templates</TabMeta>
            </TabGroup>
          </Col>
        </Row>
      </Row>
    );
  }
}

export { TabContainer }


