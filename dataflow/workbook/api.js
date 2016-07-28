import fetch from "../fetchWrapper";

const api = "http://localhost:3001/api/workbook";
const token = "93abcf28-65e9-45b1-912a-8bec6eb10a3d";

export const searchWorkbook = (query) =>
  fetch("GET", token, `${api}?query=${query}`)
    .then(res => res.json())
    .then(json => ({
      options : json.data.map(item => ({ label : item.name, id : item._id }))
    }));
