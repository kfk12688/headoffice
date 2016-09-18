import Workbooks from "./";

const Route = {
  path : "workbooks",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Workbooks);
    });
  },
};

export default Route;
