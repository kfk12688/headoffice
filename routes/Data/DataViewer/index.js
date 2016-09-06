/**
 * Created by sharavan on 06/09/16.
 */
import Editor from "../DataEntry/Editor";

const Route = {
  path : "entry/:id",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Editor);
    });
  },
};

export default Route;
