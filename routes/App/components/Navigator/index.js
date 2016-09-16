/**
 * Created by sharavan on 15/05/16.
 */
import React from "react";
import { TabGroup, Tab, NavLink, PopupButton } from "components";
import styles from "./Navigator.less";
import Logo from "../../../styles/logo";

const Navigator = (props) => {
  const { user, logoutUser } = props;
  const { username, firstName } = !!user && user;

  const popupStyle = {
    color    : "inherit",
    fontSize : "inherit",
    padding  : "inherit",
  };

  return (
    <div className={styles.root}>
      <div className={styles.brand}><Logo size="18" light/> Head Office App</div>

      <div className={styles.nav}>
        <TabGroup childClassName={styles.link}>
          <Tab><NavLink to="/app/template">Templates</NavLink></Tab>
          <Tab><NavLink to="/app/data">Data</NavLink></Tab>
          <Tab><NavLink to="/app/view">Reports</NavLink></Tab>
          <Tab><NavLink to="/app/user">Users</NavLink></Tab>
          <Tab><NavLink to="/app/workbooks">Workbooks</NavLink></Tab>
        </TabGroup>
      </div>

      <div className={styles.assist}>
        <TabGroup childClassName={styles.link}>
          <Tab>Alerts</Tab>
          <Tab>Help</Tab>
          <Tab>
            <PopupButton label={firstName} style={popupStyle}>
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
  user       : React.PropTypes.object,
  logoutUser : React.PropTypes.func,
};

export { Navigator };
