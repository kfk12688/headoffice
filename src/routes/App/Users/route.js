import Users from "./";
import UserView from "./UserView";

const Route = {
  path        : "user",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Users);
    });
  },
  childRoutes : [
    UserView,
  ],
};

export default Route;
