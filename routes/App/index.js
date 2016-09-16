import React from "react";
import { connect } from "react-redux";
import { Navigator } from "./components/Navigator";
import { logoutUser } from "dataflow/auth/actions";
import cx from "classnames";
import styles from "./index.less";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { rollUp : true };
    this.handleRollUpToggle = this.handleRollUpToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { authStore } = nextProps;
    const { isAuthenticated } = authStore;
    if (!isAuthenticated) this.context.router.push("/login");
  }


  handleRollUpToggle() {
    this.setState({ rollUp : !this.state.rollUp });
  }

  render() {
    const { authStore } = this.props;
    const { user } = authStore;

    return (
      <div>
        {/* Roll Up/Down Gimmick */}
        <div
          onClick={this.handleRollUpToggle}
          className={cx({
            [styles.rollDownHandle] : !this.state.rollUp,
            [styles.rollUpHandle]   : this.state.rollUp,
          })}
        >
          <span />
        </div>

        {/* Fixed navigator header */}
        {
          this.state.rollUp &&
          <Navigator user={user} logoutUser={this.props.logoutUser}/>
        }

        {/* Route Children */}
        {
          this.props.children && React.cloneElement(this.props.children, {
            rollUp : this.state.rollUp,
          })
        }
      </div>
    );
  }
}

App.propTypes = {
  authStore  : React.PropTypes.object,
  logoutUser : React.PropTypes.func,
  children   : React.PropTypes.node.isRequired,
};
App.contextTypes = {
  router : React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authStore : state.auth,
});

const mapDispatchToProps = dispatch => ({
  logoutUser : () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
