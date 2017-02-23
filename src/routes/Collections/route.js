import Data from "./";
import DataEntry from "./Creator/route";
import DataViewer from "./Viewer/route";
import DataEditor from "./Editor/route";
import { requireAuth } from "../auth";

const Route = {
  path        : "collections",
  component   : Data,
  onEnter     : requireAuth,
  childRoutes : [
    DataEntry,
    DataViewer,
    DataEditor,
  ],
};

export default Route;
