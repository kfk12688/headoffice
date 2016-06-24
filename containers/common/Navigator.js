/**
 * Created by sharavan on 15/05/16.
 */
import React from "react";
import { TabGroup, Tab, NavLink } from "../../components/index";
import styles from "./Navigator.less";

const Navigator = props =>
  <div
    fullWidth
    className={styles.root}
  >
    <div className={styles.header}>
      <div className={styles.brand}> Head Office App</div>
      <div className={styles.assist}>
        <TabGroup childClassName={styles.link}>
          <Tab>Alerts</Tab>
          <Tab>Help</Tab>
          <Tab>Sharavanth R</Tab>
        </TabGroup>
      </div>
    </div>
    <div className={styles.nav}>
      <TabGroup childClassName={styles.link}>
        <Tab><NavLink to="/content">Content</NavLink></Tab>
        <Tab><NavLink to="/view">View</NavLink></Tab>
        <Tab><NavLink to="/users">Users</NavLink></Tab>
        <Tab><NavLink to="/groups">Groups</NavLink></Tab>
      </TabGroup>
    </div>
  </div>;

export { Navigator };
