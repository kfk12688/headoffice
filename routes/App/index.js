import App from "./App";
import contentRoute from "../Content";
import userRoute from "../User";

const RootRoute = {
  path        : "/",
  component   : App,
  childRoutes : [
    contentRoute,
    userRoute,
  ],
};

export default RootRoute;
