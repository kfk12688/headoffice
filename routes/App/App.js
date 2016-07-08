import React from "react";
import { Navigator } from "components";
import cx from "classnames";
import styles from "./App.less";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { rollUp : true };
    this.handleRollUpToggle = this.handleRollUpToggle.bind(this);
  }

  handleRollUpToggle() {
    this.setState({ rollUp : !this.state.rollUp });
  }

  render() {
    return (
      <div>
        {/* Roll Up/Down Gimmick */}
        <div
          onClick={this.handleRollUpToggle}
          className={cx({
            [styles.rollDownHandle] : !this.state.rollUp,
            [styles.rollUpHandle]   : this.state.rollUp,
          })}
        >
          <span />
        </div>

        {/* Fixed navigator header */}
        {this.state.rollUp ? <Navigator/> : ""}

        {/* Route Children */}
        {
          this.props.children && React.cloneElement(this.props.children, {
            rollUp : this.state.rollUp,
          })
        }
      </div>
    );
  }
}

export default App;
