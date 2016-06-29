/**
 * Created by sharavan on 28/06/16.
 */
import "isomorphic-fetch";
import { data as egdata } from "../mock_data/EGData";

const getTemplateForEdit = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data : egdata }), 1100);
  });
};

export { getTemplateForEdit };
