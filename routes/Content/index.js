import Content from "./Content";
import TemplateEditor from "./TemplateEditor";
import TemplateEntry from "./TemplateEntry";

const Route = {
  path        : "content",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Content);
    });
  },
  childRoutes : [
    TemplateEditor,
    TemplateEntry,
  ],
};

export default Route;
