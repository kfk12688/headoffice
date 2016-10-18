import Data from "./";
import DataEntry from "./DataEntry/route";
import DataViewer from "./DataViewer/route";
import { requireAuth } from "../auth";

const Route = {
  path        : "data",
  component   : Data,
  onEnter     : requireAuth,
  childRoutes : [
    DataEntry,
    DataViewer,
  ],
};

export default Route;
