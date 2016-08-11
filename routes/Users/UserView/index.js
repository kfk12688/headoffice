import Editor from "./Editor";

const Route = {
  path : "edit/:id",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Editor);
    });
  },
};

export default Route;
