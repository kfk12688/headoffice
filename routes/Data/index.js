import Data from "./Data";
import DataEntry from "./DataEntry";
import DataViewer from "./DataViewer";

const Route = {
  path        : "data",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Data);
    });
  },
  childRoutes : [
    DataEntry,
    DataViewer,
  ],
};

export default Route;
