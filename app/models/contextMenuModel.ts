/**
 * Created by sharavan on 16/06/16.
 */
import { IReducer } from "~redux/redux";

interface IContextMenuState {
  showActionsMenu: boolean
  showSidebar: boolean
  showSortingHelper: boolean
}

type IContextMenuReducer = IReducer<IContextMenuState, any>

export { IContextMenuState, IContextMenuReducer }
