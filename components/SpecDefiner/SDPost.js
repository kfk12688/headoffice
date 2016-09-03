import React from "react";
import SDForm from "./SDForm";
import styles from "./SDPost.less";

const ADD_NEW_ENTRY = true;
const EDIT_EXISTING_ENTRY = false;

class SDPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entryState : ADD_NEW_ENTRY };
  }

  render() {
    const { onSubmit } = this.props;

    return (
      <div className={styles.post}>

        <SDForm
          className={styles.fieldsForm}
          editorState={this.state.entryState}
          onSubmit={onSubmit}
        />

      </div>
    );
  }
}

SDPost.propTypes = {
  onSubmit : React.PropTypes.func,
};

export { SDPost };
