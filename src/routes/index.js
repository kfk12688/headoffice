/**
 * Created by sharavan on 15/09/16.
 */
import React from "react";

const App = ({ children }) =>
  <div>{children}</div>;

App.propTypes = {
  children : React.PropTypes.node.isRequired,
};

export default App;
