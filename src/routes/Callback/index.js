import React, { Component } from "react";
import { getToken, clearToken, setToken } from "../auth";

class Callback extends Component {
  componentDidMount() {
    clearToken();
    setToken(this.props.location.query);
    if (!!getToken()) {
      this.context.router.push("/template");
    } else {
      this.context.router.push("/");
    }
  }

  render() {
    return (
      <div>Please wait while you are re-directed.</div>
    );
  }
}

Callback.contextTypes = {
  router : React.PropTypes.func.isRequired,
};

export default Callback;
