import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Button } from "components";
import Logo from "../../styles/logo";
import styles from "./index.less";
import cx from "classnames";

class Login extends Component {
  constructor(props, context) {
    super(props, context);
  }

  onSubmit() {}

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          <a href="https://headoffice.com"><Logo size="48"/></a>
        </div>

        <div className={styles.form}>
          <form onSubmit={this.onSubmit}>
            <div className={styles.formHeader}>
              <h1>Sign Up into HeadOffice</h1>
            </div>

            <div className={styles.formBody}>
              <label htmlFor="login_field">Username</label>
              <input
                ref="username"
                tabIndex="1"
                type="text"
                autoFocus="autofocus"
                autoCorrect="off"
                autoCapitalize="off"
                className={styles.inputBlock}
              />

              <label>Email address</label>
              <input
                tabIndex="2"
                type="email"
                autoFocus="autofocus"
                autoCorrect="off"
                autoCapitalize="off"
                className={styles.inputBlock}
              />

              <label>First Name</label>
              <input
                tabIndex="3"
                type="text"
                autoFocus="autofocus"
                autoCorrect="off"
                autoCapitalize="off"
                className={styles.inputBlock}
              />

              <label>Last Name</label>
              <input
                tabIndex="4"
                type="text"
                autoFocus="autofocus"
                autoCorrect="off"
                autoCapitalize="off"
                className={styles.inputBlock}
              />

              <label htmlFor="password">Password</label>
              <input
                ref="password"
                tabIndex="5"
                type="password"
                className={styles.inputBlock}
              />

              <Button
                tabIndex="6"
                type="submit"
                className={cx(styles.btn, styles.btnBlock, styles.btnPrimary)}
              >
                Submit
              </Button>

              <Button
                tabIndex="7"
                bordered
                className={cx(styles.btn, styles.btnBlock)}
              >
                Cancel
              </Button>
            </div>
          </form>
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

Login.propTypes = {};
Login.contextTypes = {
  router : React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default
connect(mapStateToProps, mapDispatchToProps)(Login);
