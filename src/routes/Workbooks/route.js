import Workbooks from "./";
import { requireAuth } from "../authHelpers";

const Route = {
  path      : "workbooks",
  onEnter   : requireAuth,
  component : Workbooks,
};

export default Route;
