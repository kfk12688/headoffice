import fetch from "../fetchWrapper";

const api = "http://localhost:3001/api/workbook";

export const searchWorkbook = (query) =>
  fetch("GET", `${api}?query=${query}`)
    .then(res => res.json())
    .then(json => ({
      options : json.data.map(item => ({ label : item.name, id : item._id }))
    }));
