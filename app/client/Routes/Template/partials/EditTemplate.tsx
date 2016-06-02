import "font-awesome-webpack";
import * as React from "react";
import { Row, Col, Divider, EG } from "components";
import "./TemplateRoute.less";
import { grey700 } from "../../../styles/colors";
const FontAwesome: any = require("react-fontawesome");

interface IProps {
  params: any;
}

const MetaHelper = (props: any) => <span style={{color : grey700}}>{props.children}</span>;

class EditTemplate extends React.Component <IProps, {}> {
  render(): JSX.Element {
    return (
      <div className="ho-template-route">

        { /* Info Area */ }
        <Row className="info-area">
          <div className="title"><FontAwesome name="user"/> {this.props.params.templateName}</div>
          <div className="meta">
            <MetaHelper> TEMPLATE • </MetaHelper>
            <span>Owner </span><MetaHelper>Sharavan R</MetaHelper>
            <MetaHelper> • </MetaHelper>
            <span>Last Modified At </span><MetaHelper>5th June, 2016</MetaHelper>
          </div>
        </Row>

        <Divider size={6} className="divider"/>

        { /* Working Area */}
        <Row className="working-area">
          <Col className="search">
          </Col>
          <Col className="grid"><EG/></Col>
        </Row>
      </div>
    );
  }

  public getBreadcrumbTitle() {
    return <span><FontAwesome name="user"/>TEMP</span>;
  }
}

export { EditTemplate };
