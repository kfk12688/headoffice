import Template from "./";
import TemplateEditor from "./Editor/route";
import TemplateViewer from "./Viewer/route";
import TemplateCreator from "./Creator/route";
import { requireAuth } from "../auth";

const Route = {
  path        : "templates",
  component   : Template,
  onEnter     : requireAuth,
  childRoutes : [
    TemplateCreator,
    TemplateEditor,
    TemplateViewer,
  ],
};

export default Route;
