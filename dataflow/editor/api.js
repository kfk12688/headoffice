import fetch from "../fetchWrapper";

const api = "http://localhost:3001/api/template";
const token = "7f96ded4-c6f7-4dde-8fee-0e08d2554fc7";

export const getTemplateForEdit = (params) => {
  return fetch("GET", token, `${api}/${params.id}`)
    .then(res => res.json());
};

// const getTemplateForEdit = (params) => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve({ data : egdata }), 1100);
//   });
// };
