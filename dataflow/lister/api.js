/**
 * Created by sharavan on 05/09/16.
 */
import fetch from "../fetchWrapper";
import _ from "underscore";

const api = "http://localhost:3001/api";

const listFieldValues = (query) => {
  const { refId, refFieldName } = query;

  const fetchPromise = () => fetch("GET", `${api}/user/${refId}/${refFieldName}`)
    .then(res => res.json())
    .then(json => ({
      options : _.map(json.data, item => ({ label : item[refFieldName], id : item._id })),
    }));

  return fetchPromise;
};

export { listFieldValues };
