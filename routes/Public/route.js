import App from "./index";
import loginRoute from "./Login/route";
// import signUpRoute from "./SignUp/route";

const RootRoute = {
  path        : "/",
  component   : App,
  indexRoute  : { onEnter : (nextState, replace) => replace("/login") },
  childRoutes : [
    loginRoute,
  ],
};

export default RootRoute;
