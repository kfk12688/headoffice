import Template from "./Template";
import TemplateEditor from "./TemplateEditor";

const Route = {
  path        : "template",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Template);
    });
  },
  childRoutes : [
    TemplateEditor,
  ],
};

export default Route;
