import Template from "./";
import TemplateEditor from "./TemplateEditor/route";

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
