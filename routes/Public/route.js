import App from "./index";
import loginRoute from "./Login/route";
// import signUpRoute from "./SignUp/route";

const route = {
  path        : "public",
  component   : App,
  childRoutes : [
    loginRoute,
  ],
};

export default route;
