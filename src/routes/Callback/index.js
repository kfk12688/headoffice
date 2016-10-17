import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserClaims, clearToken, setToken } from "../auth";
import { addCurrentUser } from "dataflow/user/actions";

class Callback extends Component {
  componentDidMount() {
    clearToken();
    setToken(this.props.location.query);
    const claims = getUserClaims();

    if (!!claims) {
      this.props.addCurrentUser(claims);
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

Callback.propTypes = {
  addCurrentUser : React.PropTypes.func,
};

Callback.contextTypes = {
  router : React.PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addCurrentUser : (claims) => dispatch(addCurrentUser(claims)),
});

export default connect(null, mapDispatchToProps)(Callback);
