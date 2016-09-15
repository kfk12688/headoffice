import App from "./index";
import templateRoute from "./Template/route";
import dataRoute from "./Data/route";
import userRoute from "./Users/route";
import workbooksRoute from "./Workbooks/route";

const RootRoute = {
  path        : "/",
  component   : App,
  childRoutes : [
    templateRoute,
    dataRoute,
    userRoute,
    workbooksRoute,
  ],
};

export default RootRoute;
