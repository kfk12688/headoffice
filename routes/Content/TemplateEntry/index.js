import Editor from "./Editor";

const Route = {
  path : "data/:id",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Editor);
    });
  },
};

export default Route;
