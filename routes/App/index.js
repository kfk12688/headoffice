import App from "./App";
import contentRoute from "../Content";
import userRoute from "../Users";
import workbooksRoute from "../Workbooks";

const RootRoute = {
  path        : "/",
  component   : App,
  childRoutes : [
    contentRoute,
    userRoute,
    workbooksRoute,
  ],
};

export default RootRoute;
