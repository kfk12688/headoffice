import Content from "./Content";
import TemplateViewer from "./TemplateViewer";
import TemplateEntry from "./TemplateEntry";

const Route = {
  path        : "content",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Content);
    });
  },
  childRoutes : [
    TemplateViewer,
    TemplateEntry,
  ],
};

export default Route;
