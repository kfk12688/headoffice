// Using modified css class from original (react-datepicker.css)
import "./DatePicker.less";
import * as React from "react";
import * as moment from "moment/moment";

var ZippyDatePicker = require("react-datepicker");

interface IState {
  date: moment.Moment;
}

class DatePicker extends React.Component<{}, IState> {
  state: IState = {
    date : undefined,
  };

  handleChange: Function = (date: moment.Moment) => {
    this.setState({
      date : date,
    });
  };

  render (): JSX.Element {
    return (
      <ZippyDatePicker dateFormat="DD-MM-YYYY" selected={this.state.date} onChange={this.handleChange} />
    );
  }
}

export {DatePicker}
