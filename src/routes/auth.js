import jwtDecode from "jwt-decode";
import { objectToURI as encodeURI, randomString as getNonce } from "utils";

// Private Functions
const isDeveloping   = process.env.NODE_ENV !== "production";         // fixme
const isTokenPresent = () => !!localStorage.getItem("id_token");
const decodeToken    = (token) => jwtDecode(token);

// Public functions
export const getToken   = () => localStorage.getItem("id_token");
export const clearToken = () => {
  localStorage.removeItem("id_token");
  localStorage.removeItem("token_type");
  localStorage.removeItem("expires_in");
};

export const setToken = (params) => {
  localStorage.setItem("id_token", params.id_token);
  localStorage.setItem("token_type", params.token_type);
  localStorage.setItem("expires_in", params.expires_in);
};

export const requireAuth = (nextState, replace, next) => {
  if (isTokenPresent()) return next();

  const subDomainParts = window.location.host.split(".");
  const subDomain      = subDomainParts[0];
  let clientID         = "57f0e4c95afd1a1c27e0ad7d";
  let authServerURI    = "http://localhost:3002/auth/authorize";
  let redirectURI      = "http://localhost:3001/#/callback";
  if (!isDeveloping) {
    authServerURI = "http://auth.headofficeapp.in/auth/authorize";
    redirectURI   = `http://${subDomain}.headofficeapp.in/#/callback`;
    clientID      = "5800a711ffc62ba79898b4db";
  }

  const encodedString = encodeURI({
    response_type : "token id_token",
    client_id     : clientID,
    redirect_uri  : redirectURI,
    scope         : "openid profile",
    state         : "init",
    nonce         : getNonce(6),
  });

  // eslint-disable no-native-reassign
  window.location = `${authServerURI}?${encodedString}`;
};

export const getUserClaims = () => decodeToken(getToken());
