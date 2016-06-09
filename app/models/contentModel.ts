/**
 * Created by sharavan on 16/06/16.
 */
import { IReducer } from "redux";
import { IRowProps } from "../components/DataGrid/DGTypes";

interface IContentState {
  sortKey: string
  sortAscending: boolean
  data: IRowProps
  countSelected: number
}

type IContentReducer = IReducer<IContentState, any>

export { IContentState, IContentReducer }
