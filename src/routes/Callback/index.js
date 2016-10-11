import React, { Component } from "react";
import { acceptAuth } from "../authHelpers";

class Callback extends Component {
  componentDidMount() {
    const isAuthSuccess = acceptAuth(this.props.location.query);
    this.context.router.push("/template");
  }

  render() {
    return (
      <div>This is the Callback route</div>
    );
  }
}

Callback.contextTypes = {
  router : React.PropTypes.func.isRequired,
};

export default Callback;
