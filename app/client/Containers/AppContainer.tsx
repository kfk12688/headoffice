/**
 * Created by sharavan on 07/06/16.
 */

import * as React from "react";
import { Link } from "react-router";
import { Grid, Row } from "components";
import { NavContainer } from "../Containers/NavContainer";
const cx: any = require("classnames");

interface IState {
  rollUp?: boolean;
}

class AppContainer extends React.Component <{}, {}> {
  state: IState = {
    rollUp: false,
  };

  render(): JSX.Element {
    return (
      <Grid>
        { /* Roll up/down gimmick */ }
        <div
          onClick={this.handleRollUpToggle}
          className={cx({
            "roll-down-handle" : this.state.rollUp,
            "roll-up-handle" : !this.state.rollUp,
          })}
        >
          <span/>
        </div>

        { /* App Navigator */ }
        <NavContainer rollUp={this.state.rollUp}/>

        { /* Breadcrumbs */ }
        <Row
          className={cx("ho-breadcrumbs", { "rolled-up" : this.state.rollUp })}
        >
          <ul>
            {
              this.props.routes.map((item, index) => {
                let breadcrumb  = (typeof item.component.prototype.getBreadcrumbTitle === "function") ?
                                  item.component.prototype.getBreadcrumbTitle() : undefined;
                let routeLength = this.props.routes.length;

                let link = undefined;
                if ((index + 1) !== routeLength) {
                  link = <Link onlyActiveOnIndex={true} to={item.path || ""}>
                    {breadcrumb}
                  </Link>;
                } else {
                  link = breadcrumb;
                }

                if ((index !== 0) && (breadcrumb !== undefined)) {
                  return (
                    <li key={index}>
                      {link}
                      {(index + 1) < routeLength && "\u2192"}
                    </li>
                  );
                }
              })
            }
          </ul>
        </Row>

        { /* View Container */ }

        <Row
          fullWidth
          className={cx("ho-staging-container",{
          "rolled-up" : this.state.rollUp,
          "rolled-down" : !this.state.rollUp,
        })}
        >
          {this.props.children}
        </Row>
      </Grid>
    );
  }

  private handleRollUpToggle: Function = () => {
    let rollUp = (this.state.rollUp) ? false : true;
    this.setState({ rollUp: rollUp });
  };
}

export { AppContainer }
