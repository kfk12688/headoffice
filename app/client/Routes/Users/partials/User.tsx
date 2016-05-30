import "font-awesome-webpack";
import * as React from "react";
import { Row, Col, TabGroup, TabMeta, Divider } from "components";
import "./UsersRoute.less";
import { grey700 } from "../../../styles/colors";
const FontAwesome: any = require("react-fontawesome");

interface IProps {
  params: any;
}

const MetaHelper = (props: any) => <span style={{color : grey700}}>{props.children}</span>;

class User extends React.Component <IProps, {}> {
  render(): JSX.Element {
    return (
      <div className="ho-users-route">

        { /* Info Area */ }
        <Row className="info-area">
          <div className="title"><FontAwesome name="user"/> {this.props.params.username}</div>
          <div className="meta">
            <MetaHelper>USER • </MetaHelper>
            <span>User Name </span><MetaHelper>{this.props.params.username}</MetaHelper>
            <MetaHelper> • </MetaHelper>
            <span>Site Role</span><MetaHelper>Admin</MetaHelper>
          </div>
        </Row>

        { /* Content Area */ }
        <TabGroup  className="tab-area">
          <TabMeta meta={{}}>Access Level</TabMeta>
          <TabMeta meta={{}}>Settings</TabMeta>
        </TabGroup>

        <Divider size={6} className="divider"/>

        { /* Working Area */}
        <Row className="working-area">
          <Col className="search">
          </Col>
          <Col className="grid">
          </Col>
        </Row>
      </div>
    );
  }

  public getBreadcrumbTitle() {
    return <span><FontAwesome name="user"/>TEMP</span>;
  }
}

export { User };
