import * as React from "react";
import * as ReactDOM from "react-dom";

import { DatePicker } from "../components/DatePicker/DatePicker";
import { Grid } from "../components/Grid";
import { Row } from "../components/Row";
import { Col } from "../components/Col";
// noinspection TypeScriptCheckImport
import { Checkbox } from "components/Checkbox";

interface IState {
  /**
   * Manages the checkbox state
   */
  checked: boolean;
}

class HOApp extends React.Component <{}, IState> {
  state: IState = {
    checked: false
  };

  constructor ( props ) {
    super( props );
    this.handleCheckboxChange = this.handleCheckboxChange.bind( this );
  }

  handleCheckboxChange ( event ) {
    this.setState( {
      checked: event.target.checked
    } );
  }

  render () {
    return (
      <div>
        <Grid>
          <Row fullWidth={true} height={50}>Hello World</Row>
          <Row height={50}>HQ is going to be the best app ever</Row>
          <Row height={30}>
            <Col size={12}>
              <DatePicker />
              <Checkbox checked={this.state.checked} handler={this.handleCheckboxChange}></Checkbox>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

ReactDOM.render(
  <HOApp />,
  document.getElementById( "HOApp" )
);
