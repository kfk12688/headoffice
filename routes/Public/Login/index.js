import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { loginUser } from "dataflow/auth/actions";
import { Button, NavLink } from "components";
import styles from "./index.less";
import cx from "classnames";

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.loginUser = this.loginUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) this.context.router.push("/app/template");
  }

  loginUser(e) {
    e.preventDefault();

    const username = this.refs.username;
    const password = this.refs.password;
    const creds = { username : username.value.trim(), password : password.value.trim() };
    this.props.loginUser(creds);
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <div className={styles.base}>
        <div className={styles.header}>
          <a href="https://headoffice.com">
            <svg height="48" version="1.1" viewBox="0 0 16 16" width="48">
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
        </div>

        <div className={styles.form}>
          <form>
            <div className={styles.formHeader}>
              <h1>Sign in to HeadOffice</h1>
            </div>

            <div className={styles.formBody}>
              <label htmlFor="login_field">Username or email address</label>
              <input
                ref="username"
                tabIndex="1"
                type="text"
                autoFocus="autofocus"
                autoCorrect="off"
                autoCapitalize="off"
                className={styles.inputBlock}
              />

              <label htmlFor="password">
                Password
                <NavLink to="/password_reset">Forgot password?</NavLink>
              </label>
              <input
                ref="password"
                tabIndex="2"
                type="password"
                className={styles.inputBlock}
              />

              <Button
                tabIndex="3"
                type="submit"
                className={cx(styles.btn, styles.btnBlock, styles.btnPrimary)}
                onClick={this.loginUser}
              >
                Sign In
              </Button>

              {
                errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>
              }
            </div>
          </form>

          <p className={styles.createAccountCallout}>
            New to HeadOffice?
            <NavLink to="/signup">Create an account</NavLink>.
          </p>
        </div>

        <div className={styles.footer}>
          <ul className={styles.footerLinks}>
            <li><a href="https://headoffice.com/site/terms">Terms</a></li>
            <li><a href="https://headoffice.com/site/privacy">Privacy</a></li>
            <li><a href="https://headoffice.com/security">Security</a></li>
            <li><a href="https://headoffice.com/contact">Contact HeadOffice</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser    : PropTypes.func.isRequired,
  errorMessage : PropTypes.string,
};

Login.contextTypes = {
  router : React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { errorMessage, isAuthenticated } = state.auth;

  return {
    isAuthenticated,
    errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loginUser : creds => dispatch(loginUser(creds)),
});

export default
connect(mapStateToProps, mapDispatchToProps)(Login);
