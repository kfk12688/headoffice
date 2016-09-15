/**
 * Created by sharavan on 15/09/16.
 */
import appRoute from "./App/route";
import publicRoute from "./Public/route";

const getToken = () => localStorage.getItem("id_token");

const getRoute = () => {
  if (getToken() !== null) return appRoute;
  return publicRoute;
};

export default getRoute;
