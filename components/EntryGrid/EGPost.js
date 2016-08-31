import React from "react";
import EditorEntryForm from "./EGForm";
import styles from "./EGPost.less";

const ADD_NEW_ENTRY = true;
const EDIT_EXISTING_ENTRY = false;

class EGPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entryState : ADD_NEW_ENTRY };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRow !== null) {
      this.setState({ entryState : EDIT_EXISTING_ENTRY });
    } else {
      this.setState({ entryState : ADD_NEW_ENTRY });
    }
  }

  render() {
    const { cols, postHandler, clearEditFlag } = this.props;

    return (
      <div className={styles.post}>
        <div className={styles.postTab}>
          <span className={styles.postHeading}>
            {this.state.entryState ? "Add new data" : "Edit highlighted data"}
          </span>
        </div>

        <EditorEntryForm
          cols={cols}
          fields={Object.keys(cols)}
          submitForm={postHandler}
          clearEditFlag={clearEditFlag}
          editorState={this.state.entryState}
        />

      </div>
    );
  }
}

EGPost.propTypes = {
  cols          : React.PropTypes.object.isRequired,
  postHandler   : React.PropTypes.func.isRequired,
  clearEditFlag : React.PropTypes.func.isRequired,
};

export { EGPost };
