/**
 * Created by sharavan on 15/09/16.
 */
const isLoggedIn = () => localStorage.getItem("id_token") !== null;

export const requireAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({
      pathname : "/login",
      state    : { nextPathname : nextState.location.pathname },
    });
  }
};
