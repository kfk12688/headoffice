/**
 * Created by sharavan on 15/05/16.
 */
import React from "react";
import { TabGroup, Tab, NavLink } from "components";
import styles from "./Navigator.less";

const Navigator = () =>
  <div
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
        <Tab><NavLink to="/template">Templates</NavLink></Tab>
        <Tab><NavLink to="/data">Data</NavLink></Tab>
        <Tab><NavLink to="/view">Views</NavLink></Tab>
        <Tab><NavLink to="/user">Users</NavLink></Tab>
        <Tab><NavLink to="/workbooks">Workbooks</NavLink></Tab>
      </TabGroup>
    </div>
  </div>;

export { Navigator };
