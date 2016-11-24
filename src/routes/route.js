import App from "./index";
import templateRoute from "./Templates/route";
import collectionsRoute from "./Collections/route";
import workbooksRoute from "./Workbooks/route";
import callbackRoute from "./Callback/route";

const RootRoute = {
  path        : "/",
  component   : App,
  childRoutes : [
    templateRoute,
    collectionsRoute,
    workbooksRoute,
    callbackRoute,
  ],
};

export default RootRoute;
