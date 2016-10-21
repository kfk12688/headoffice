import React from "react";
import { connect } from "react-redux";
import { Navigator } from "./_components/Navigator";
import { addCurrentUser, removeCurrentUser } from "dataflow/user/actions";
import { clearToken, getUserClaims } from "./auth";
import cx from "classnames";
import styles from "./index.less";

const isDeveloping = process.env.NODE_ENV !== "production";
const url = isDeveloping ? "http://localhost:3002" : "http://auth.headofficeapp.in";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rollUp : true };
    this.handleRollUpToggle = this.handleRollUpToggle.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    let claims;
    try {
      claims = getUserClaims();
    } catch (err) {
      claims = null;
    }

    if (!!claims) {
      this.props.addCurrentUser(claims);
    }
  }

  handleRollUpToggle() {
    this.setState({ rollUp : !this.state.rollUp });
  }

  logOut() {
    clearToken();
    this.props.removeCurrentUser();
    window.location = `${url}/logout`;
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div>
        <div onClick={this.handleRollUpToggle} className={cx({
          [styles.rollDownHandle] : !this.state.rollUp,
          [styles.rollUpHandle]   : this.state.rollUp,
        })}><span/></div>
        {this.state.rollUp && <Navigator className={styles.navigatorCtn} user={currentUser} logoutUser={this.logOut}/>}
        {this.props.children && React.cloneElement(this.props.children, {
          rollUp : this.state.rollUp,
        })}
      </div>
    );
  }
}

App.propTypes = {
  children          : React.PropTypes.node.isRequired,
  currentUser       : React.PropTypes.object.isRequired,
  removeCurrentUser : React.PropTypes.func.isRequired,
  addCurrentUser    : React.PropTypes.func.isRequired,
};

App.contextTypes = {
  router : React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUser : state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  removeCurrentUser : () => dispatch(removeCurrentUser()),
  addCurrentUser    : (claims) => dispatch(addCurrentUser(claims)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
