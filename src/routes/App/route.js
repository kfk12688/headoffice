import App from "./index";
import templateRoute from "./Template/route";
import dataRoute from "./Data/route";
import userRoute from "./Users/route";
import workbooksRoute from "./Workbooks/route";
import { requireAuth } from "../authHelpers";

const RootRoute = {
  path        : "app",
  component   : App,
  onEnter     : requireAuth,
  childRoutes : [
    templateRoute,
    dataRoute,
    userRoute,
    workbooksRoute,
  ],
};

export default RootRoute;
