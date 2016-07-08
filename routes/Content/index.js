import Content from "./Content";
import Editor from "./Editor";

const Route = {
  path        : "content",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Content);
    });
  },
  childRoutes : [
    Editor,
  ],
};

export default Route;
