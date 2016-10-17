import Template from "./";
import TemplateEditor from "./TemplateEditor/route";
import { requireAuth } from "../auth";

const Route = {
  path        : "template",
  component   : Template,
  onEnter     : requireAuth,
  childRoutes : [
    TemplateEditor,
  ],
};

export default Route;
