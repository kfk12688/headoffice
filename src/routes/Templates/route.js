import Template from "./";
import TemplateEditor from "./Editor/route";
import { requireAuth } from "../auth";

const Route = {
  path        : "templates",
  component   : Template,
  onEnter     : requireAuth,
  childRoutes : [
    TemplateEditor,
  ],
};

export default Route;
