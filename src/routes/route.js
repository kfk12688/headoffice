import App from "./index";
import templateRoute from "./Templates/route";
import dataRoute from "./Collections/route";
import workbooksRoute from "./Workbooks/route";
import callbackRoute from "./Callback/route";

const RootRoute = {
  path        : "/",
  component   : App,
  childRoutes : [
    templateRoute,
    dataRoute,
    workbooksRoute,
    callbackRoute,
  ],
};

export default RootRoute;
