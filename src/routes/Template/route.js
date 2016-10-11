import Template from "./";
import TemplateEditor from "./TemplateEditor/route";
import { requireAuth } from "../authHelpers";

const Route = {
  path        : "template",
  component   : Template,
  onEnter     : requireAuth,
  childRoutes : [
    TemplateEditor,
  ],
};

export default Route;
