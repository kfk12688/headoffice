/**
 * Created by sharavan on 15/05/16.
 */
import React from "react";
import { TabGroup, Tab, NavLink, PopupButton } from "components";
import styles from "./Navigator.less";
import Logo from "../../_styles/logo";

const Navigator = (props) => {
  const { user, logoutUser, className } = props;
  const { username, name, site } = !!user && user;

  const popupStyle = {
    color    : "inherit",
    fontSize : "inherit",
    padding  : "inherit",
  };

  return (
    <div className={className}>
      <div className={styles.brand}><Logo size="18" light/> Head Office App</div>

      <div className={styles.nav}>
        <TabGroup childClassName={styles.link}>
          <Tab><NavLink to="/template">Templates</NavLink></Tab>
          <Tab><NavLink to="/data">Data</NavLink></Tab>
          <Tab><NavLink to="/view">Reports</NavLink></Tab>
          <Tab><NavLink to="/user">Users</NavLink></Tab>
          <Tab><NavLink to="/workbooks">Workbooks</NavLink></Tab>
        </TabGroup>
      </div>

      <div className={styles.assist}>
        <TabGroup childClassName={styles.link}>
          <Tab>Alerts</Tab>
          <Tab>Help</Tab>
          <Tab><PopupButton label={site} style={popupStyle}/></Tab>
          <Tab>
            <PopupButton label={name} style={popupStyle}>
              <div>Logged in as {username}</div>
              <div onClick={() => logoutUser()}>Sign Out</div>
            </PopupButton>
          </Tab>
        </TabGroup>
      </div>
    </div>
  );
};

Navigator.propTypes = {
  className  : React.PropTypes.string,
  user       : React.PropTypes.object,
  logoutUser : React.PropTypes.func,
};

export { Navigator };
