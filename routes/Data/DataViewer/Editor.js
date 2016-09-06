import React, { Component } from "react";
import { connect } from "react-redux";
import { EntryGrid, Button, NavLink } from "components";
import { clearMenuState } from "dataflow/menu/actions";
import { loadSpec } from "dataflow/data/view/actions";
import { TitleBar } from "./TitleBar";
import styles from "./Editor.less";

class Editor extends Component {
  componentWillMount() {
    const { id: templateId } = this.props.params;
    this.props.loadSpec({ templateId });
  }

  render() {
    const { viewStore } = this.props;
    const { spec, data, loadingIndicators, id } = viewStore;

    return (
      <div className={styles.container}>

        {/* Title Menu */}
        <TitleBar
          className={styles.titleBar}
          store={viewStore}
        />

        <div>
          {/* Sidebar Container */}
          <div className={styles.sidebar}>
            <NavLink to="/data">
              <Button className={styles.sbBtn} faClassName={styles.sbIcon} faName="times-circle-o">
                Close View
              </Button>
            </NavLink>
            <NavLink to={`/data/entry/${id}`}>
              <Button className={styles.sbBtn} faClassName={styles.sbIcon} faName="arrow-circle-o-right">
                Goto Entry View
              </Button>
            </NavLink>
          </div>

          {/* DataGrid Container */}
          <EntryGrid
            className={styles.entrygrid}
            spec={spec}
            data={data}
            isLoading={loadingIndicators}
          />
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  // route
  params : React.PropTypes.object,

  // state
  viewStore        : React.PropTypes.object.isRequired,

  // actions
  clearMenuState : React.PropTypes.func.isRequired,
  loadSpec       : React.PropTypes.func,
};

const mapStateToProps = state => ({
  viewStore        : state.data.view,
});

const mapDisptachToProps = dispatch => ({
  clearMenuState : () => dispatch(clearMenuState()),
  loadSpec       : (params) => dispatch(loadSpec(params)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Editor);
