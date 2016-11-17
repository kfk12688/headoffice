import Data from "./";
import DataEntry from "./Entry/route";
import DataViewer from "./Viewer/route";
import { requireAuth } from "../auth";

const Route = {
  path        : "collections",
  component   : Data,
  onEnter     : requireAuth,
  childRoutes : [
    DataEntry,
    DataViewer,
  ],
};

export default Route;
