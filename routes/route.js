/**
 * Created by sharavan on 15/09/16.
 */
import App from "./";
import appRoute from "./App/route";
import publicRoute from "./Public/route";

const route = {
  path        : "/",
  component   : App,
  indexRoute  : { onEnter : (nextState, replace) => replace('/app/template') },
  childRoutes : [
    appRoute,
    publicRoute,
  ],
};

export default route;
