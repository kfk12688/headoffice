import React, { Component } from "react";
import moment from "moment";
import { FavoriteCell } from "components";
import styles from "./TitleBar.less";
import cx from "classnames";

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
    const { className, store : { createdAt, createdBy, templateName, workBook, favorite } } = this.props;

    return (
      <div className={cx(styles.base, className)}>
        <div className={styles.left}>
          <div className={styles.title}>{templateName}</div>

          <div className={styles.meta}>
            <span>By <MetaInfo>{createdBy && `${createdBy.firstName} ${createdBy.lastName}`}</MetaInfo></span>
            <span>Created At : <MetaInfo>{createdAt && moment(createdAt).format("DD-MM-YYYY")}</MetaInfo></span>
            <span>Belongs to : <MetaInfo>{workBook && workBook.name}</MetaInfo></span>
          </div>
        </div>

        <div className={styles.icons}>
          <FavoriteCell style={{ float : "right" }} value={favorite || false} inheritSize/>
        </div>
      </div>
    );
  }
}

TitleBar.propTypes = {
  className : React.PropTypes.string,
  store     : React.PropTypes.object,
};
