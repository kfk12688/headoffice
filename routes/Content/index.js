import Content from "./Content";
import TemplateViewer from "./TemplateViewer";

const Route = {
  path        : "content",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Content);
    });
  },
  childRoutes : [
    TemplateViewer,
  ],
};

export default Route;
