import React, { Component } from "react";
import { connect } from "react-redux";
import * as menuActions from "../../../dataflow/menu/actions";
import { Sidebar } from "components";
import { EditorMenu } from "./EditorMenu";
import { TitleBar } from "./TitleBar";
import styles from "./Editor.less";

class UserView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userData, contextMenu, toggleSidebar, params : { id } } = this.props;

    return (
      <div>

        {/* Title Menu */}
        <TitleBar
          className={styles.titleBar}
          title={userData[id].name}
          meta={{ createdAt : userData[id].createdAt, phoneNumber : userData[id].phoneNumber }}
        />

        {/* Contextual Menu */}
        <EditorMenu
          className={styles.editorMenu}
          toggleSidebar={toggleSidebar}
          store={contextMenu}
        />

        <div>
          {/* Sidebar Container */}
          {
            contextMenu.showSidebar &&
            <Sidebar
              className={styles.sidebar}
            />
          }

          {/* Content Container */}
        </div>
      </div>
    );
  }
}

UserView.propTypes = {
  userData      : React.PropTypes.object,
  contextMenu   : React.PropTypes.object,
  toggleSidebar : React.PropTypes.func,
  params        : React.PropTypes.any,
};

const mapStateToProps = state => ({
  userData    : state.user.data,
  contextMenu : state.menu,
});

const mapDisptachToProps = dispatch => ({
  toggleSidebar : () => dispatch(menuActions.toggleMenuSidebar()),
});

export default connect(mapStateToProps, mapDisptachToProps)(UserView);
