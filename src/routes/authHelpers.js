import encodeURIObject from "./_utils/encodeObjectToURI";

const validateToken = (token) => {
  if (token) return true;
  return false;
};

export const requireAuth = (nextState, replace, next) => {
  const token = localStorage.getItem("id_token");
  const isTokenValidated = validateToken(token);

  if (isTokenValidated) next();

  if (!isTokenValidated) {
    localStorage.removeItem("id_token");

    const authServerURI = "auth/authorize";
    const encodedString = encodeURIObject({
      response_type : "token id_token",
      client_id     : "57f0e4c95afd1a1c27e0ad7d",
      redirect_uri  : "http://localhost:3001/#/callback",
      scope         : "openid profile",
      state         : "init",
      nonce         : "12345",
    });

    location = `http://localhost:3002/${authServerURI}?${encodedString}`;
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
