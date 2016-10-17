import Workbooks from "./";
import { requireAuth } from "../auth";

const Route = {
  path      : "workbooks",
  onEnter   : requireAuth,
  component : Workbooks,
};

export default Route;
