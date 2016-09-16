import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { loginUser } from "dataflow/auth/actions";
import { Button, NavLink } from "components";
import styles from "./index.less";
import Logo from "../../styles/logo";
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
            <Logo size="60"/>
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
