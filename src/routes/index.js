import React from "react";
import { Navigator } from "./_route_components/Navigator";
import cx from "classnames";
import styles from "./index.less";

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
        {
          this.state.rollUp &&
          <Navigator user="TO BE CHANGED" logoutUser={() => {}}/>
        }

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

App.propTypes = {
  children : React.PropTypes.node.isRequired,
};

export default App;
