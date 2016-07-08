import User from "./User";

const Route = {
  path : "user",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, User);
    });
  },
};

export default Route;
