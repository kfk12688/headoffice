import Users from "./";

const Route = {
  path : "user",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, Users);
    });
  },
};

export default Route;
