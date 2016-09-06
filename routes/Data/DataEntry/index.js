import Editor from "./Editor";

const Route = {
  path : ":id",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Editor);
    });
  },
};

export default Route;
