import App from "./App";
import templateRoute from "../Template";
import dataRoute from "../Data";
import userRoute from "../Users";
import workbooksRoute from "../Workbooks";

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
