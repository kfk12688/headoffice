import Workbooks from "./Workbooks";
import WorkbookView from "./WorkbookView";

const Route = {
  path        : "workbooks",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Workbooks);
    });
  },
  childRoutes : [
    WorkbookView,
  ],
};

export default Route;
