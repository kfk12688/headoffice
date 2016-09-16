/**
 * Created by sharavan on 15/09/16.
 */
import App from "./";
import appRoute from "./App/route";
import loginRoute from "./Public/Login/route";
import signUpRoute from "./Public/SignUp/route";

const route = {
  path        : "/",
  component   : App,
  indexRoute  : { onEnter : (nextState, replace) => replace("/app/template") },
  childRoutes : [
    appRoute,
    loginRoute,
    signUpRoute,
  ],
};

export default route;
