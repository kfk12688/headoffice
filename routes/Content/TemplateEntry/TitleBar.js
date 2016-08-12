import React, { Component } from "react";
import cx from "classnames";
import { FavoriteCell } from "components";
import styles from "./TitleBar.less";

const MetaInfo = ({ children }) => <span className={styles.metaInfo}>{children}&nbsp;&#8226;&nbsp;</span>;
MetaInfo.propTypes = {
  children : React.PropTypes.node,
};

export class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal : false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({ showModal : false });
    } else {
      this.setState({ showModal : true });
    }
  }

  render() {
    const { className, store } = this.props;

    return (
      <div className={cx(styles.base, className)}>
        <div className={styles.title}>
          <FavoriteCell value={store.data.favorite || false} inheritSize/>
          &nbsp;
          {store.data.templateName}
        </div>

        <div className={styles.meta}>
          <span>By: <MetaInfo>Sharavanth</MetaInfo></span>
          <span>Created at: <MetaInfo>NOTHING</MetaInfo></span>
          <span>Last updated at: <MetaInfo>NOTHING</MetaInfo></span>
        </div>
      </div>
    );
  }
}

TitleBar.propTypes = {
  className : React.PropTypes.string,
  store     : React.PropTypes.object,
};
