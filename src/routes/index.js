import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Dropdown } from "components";
import Logo from "./_styles/logo";
import { addCurrentUser, removeCurrentUser } from "dataflow/users/actions";
import { clearToken, getUserClaims } from "./auth";

const isDeveloping = process.env.NODE_ENV !== "production";
const url          = isDeveloping ? "http://localhost:3002" : "http://auth.headofficeapp.in";

class App extends React.Component {
  constructor(props) {
    super(props);
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

  logOut(e) {
    e.preventDefault();
    clearToken();
    this.props.removeCurrentUser();
    window.location = `${url}/logout`;
  }

  render() {
    const { currentUser }          = this.props;
    const { username, name, site } = !!currentUser && currentUser;

    return (
      <div>
        <nav className="navbar navbar-full navbar-dark bg-inverse">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <a className="navbar-brand" href="#"><Logo size="20" light/>&nbsp;HeadOfficeApp</a>
              <div className="nav navbar-nav">
                <Link activeClassName="active" className="nav-item nav-link" to="/templates">Templates</Link>
                <Link activeClassName="active" className="nav-item nav-link" to="/collections">Collections</Link>
                <Link activeClassName="active" className="nav-item nav-link" to="/workbooks">Workbooks</Link>

                <div className="pull-right">
                  <Dropdown className="nav-item nav-link" label={site}/>
                  <Dropdown className="nav-item nav-link" label={name}>
                    <div>Logged in as {username}</div>
                    <div onClick={this.logOut}>Sign Out</div>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {
          this.props.children && React.cloneElement(this.props.children)
        }
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
  router : React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentUser : state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  removeCurrentUser : () => dispatch(removeCurrentUser()),
  addCurrentUser    : (claims) => dispatch(addCurrentUser(claims)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
