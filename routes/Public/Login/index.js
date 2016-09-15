import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../../dataflow/auth/actions";
import styles from "./index.less";

class Login extends Component {

  handleClick() {
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = { username : username.value.trim(), password : password.value.trim() };
    this.props.loginUser(creds);
  }

  render() {
    const { errorMessage, rollUp } = this.props;

    return (
      <div
        className={styles.base}
        style={{ top : rollUp ? 53 : 0 }}
      >
        <input type="text" ref="username" className="form-control" style={{ marginRight : "5px" }}
               placeholder="Username"
        />
        <input type="password" ref="password" className="form-control" style={{ marginRight : "5px" }}
               placeholder="Password"
        />
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>

        {
          errorMessage &&
          <p style={{ color : "red" }}>{errorMessage}</p>
        }
      </div>
    );
  }
}

Login.propTypes = {
  loginUser    : PropTypes.func.isRequired,
  errorMessage : PropTypes.string,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  loginUser : creds => dispatch(loginUser(creds)),
});

export default
connect(mapStateToProps, mapDispatchToProps)(Login);
