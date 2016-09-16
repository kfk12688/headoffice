import Data from "./";
import DataEntry from "./DataEntry/route";
import DataViewer from "./DataViewer/route";

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
