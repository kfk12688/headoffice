import encodeURIObject from "./_utils/encodeObjectToURI";

// fixme
const isDeveloping = process.env.NODE_ENV !== "production";
const validateToken = (token) => {
  if (token) return true;
  return false;
};

export const requireAuth = (nextState, replace, next) => {
  const subDomainParts = window.location.host.split(".");
  const subDomain = subDomainParts[0];

  let authServerURI = "http://localhost:3002/auth/authorize";
  let redirectURI = "http://localhost:3001/#/callback";
  if (!isDeveloping) {
    authServerURI = "http://auth.headofficeapp.in/auth/authorize";
    redirectURI = `http://${subDomain}headofficeapp.in/#/callback`;
  }

  const token = localStorage.getItem("id_token");
  const isTokenValidated = validateToken(token);

  if (isTokenValidated) next();

  if (!isTokenValidated) {
    localStorage.removeItem("id_token");

    const encodedString = encodeURIObject({
      response_type : "token id_token",
      client_id     : "5800a711ffc62ba79898b4db",
      redirect_uri  : redirectURI,
      scope         : "openid profile",
      state         : "init",
      nonce         : "12345",
    });

    // eslint-disable no-native-reassign
    window.location = `${authServerURI}?${encodedString}`;
  }
};

export const acceptAuth = (params) => {
  localStorage.removeItem("id_token");

  const { id_token, token_type, expires_in } = params;
  const isTokenValidated = validateToken(id_token);

  if (isTokenValidated) {
    localStorage.setItem("id_token", id_token);
    return true;
  }
  return false;
};
