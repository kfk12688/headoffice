import Template from "./";
import TemplateEditor from "./TemplateEditor/route";
import { requireAuth } from "../../authHelpers";

const Route = {
  path        : "template",
  onEnter     : requireAuth,
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
