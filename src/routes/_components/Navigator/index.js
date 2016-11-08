/**
 * Created by sharavan on 15/05/16.
 */
import React from "react";
import {TabGroup, Tab, NavLink, PopupButton} from "components";
import Logo from "../../_styles/logo";

const Navigator = (props) => {
  const {user, logoutUser, className} = props;
  const {username, name, site} = !!user && user;

  const popupStyle = {
    color: "inherit",
    fontSize: "inherit",
    padding: "inherit",
  };

  return (
    <nav className="navbar navbar-full navbar-dark bg-inverse">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <a className="navbar-brand" href="#" style={{color : "red"}}><Logo size="20" light/> Head Office App</a>

          <div className="nav navbar-nav">
            <NavLink className="nav-item nav-link" to="/template">Templates</NavLink>
            <NavLink className="nav-item nav-link" to="/data">Data</NavLink>
            <NavLink className="nav-item nav-link" to="/view">Reports</NavLink>
            <NavLink className="nav-item nav-link" to="/user">Users</NavLink>
            <NavLink className="nav-item nav-link" to="/workbooks">Workbooks</NavLink>

            <div className="pull-right">
              <PopupButton label={site}/>
              <PopupButton label={name}>
                <div>Logged in as {username}</div>
                <div onClick={() => logoutUser()}>Sign Out</div>
              </PopupButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navigator.propTypes = {
  className: React.PropTypes.string,
  user: React.PropTypes.object,
  logoutUser: React.PropTypes.func,
};

export {Navigator};
