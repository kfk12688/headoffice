import React, { Component } from "react";
import moment from "moment";
import { FavoriteCell } from "components";
import cx from "classnames";

const MetaInfo = ({ children }) => <span>{children}&nbsp;&#8226;&nbsp;</span>;
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
    const { className, store : { createdAt, createdBy, templateName, workBook, isFavorite } } = this.props;

    return (
       <div className={className}>
        <div className="col-md-10">
          <div>{templateName}</div>

          <div>
            <span>By <MetaInfo>{createdBy && createdBy.name}</MetaInfo></span>
            <span>Created At : <MetaInfo>{createdAt && moment(createdAt).format("DD-MM-YYYY")}</MetaInfo></span>
            <span>Belongs to : <MetaInfo>{workBook && workBook.name}</MetaInfo></span>
          </div>
        </div>

        <div className="col-md-2">
          <FavoriteCell value={isFavorite || false} inheritSize/>
        </div>
      </div>
    );
  }
}

TitleBar.propTypes = {
  className : React.PropTypes.string,
  store     : React.PropTypes.object,
};
