import fetch from "../fetchWrapper";
// import { data } from "../mock_data/datagrid";

const apiPrefix = "http://localhost:3001/api";
const token = "7f96ded4-c6f7-4dde-8fee-0e08d2554fc7";

const getContentList = (params) => {
  return fetch("GET", `${apiPrefix}/template?access_token=${token}`)
    .then(response => response.json());

  // return new Promise((resolve) => {
  //   setTimeout(() => resolve({ data }), 3200);
  // });
};

export { getContentList };
