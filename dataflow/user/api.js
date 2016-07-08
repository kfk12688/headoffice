import "isomorphic-fetch";
import * as userData from "../mock_data/usersData";

const getUserList = (params) => {
  // return fetch;

  return new Promise((resolve) => {
    setTimeout(() => resolve({ data : userData.data }), 3200);
  });
};

export { getUserList };
