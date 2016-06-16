/**
 * Created by sharavan on 18/05/16.
 */
import "font-awesome-webpack"
import * as React from "react"
import { IColProps } from "./DGTypes"
import { grey50 } from "../../styles/colors"
let FontAwesome: any = require("react-fontawesome")

interface IDGHeaderColumnProps {
  col: IColProps
  colWidth: number
  onClick: Function
  sorted: boolean
  sortAscending?: boolean
}
// State
interface IDGHeaderColumnState {
  hovered?: boolean
}

class DGHeaderColumn extends React.Component <IDGHeaderColumnProps, IDGHeaderColumnState> {
  state: IDGHeaderColumnState = {
    hovered      : false,
  }

  render(): JSX.Element {
    // Props
    const col            = this.props.col
    const colWidth       = this.props.colWidth
    const sorted         = this.props.sorted

    // Inline styles
    const styles  = {
      backgroundColor: this.state.hovered && grey50,
      cursor: this.state.hovered && "pointer",
      textDecoration : this.state.hovered && "underline",
      width          : colWidth,
    }
    const faStyle = {
      fontSize: 10,
      position: "absolute",
      right   : 10,
      top     : 13,
    }

    // Local vars
    let arrow: React.ReactNode = undefined
    let isColSortable = (col.sortable === undefined) || col.sortable

    if (isColSortable && sorted) {
      if (this.props.sortAscending) {
        arrow = <FontAwesome style={faStyle} name="long-arrow-up"/>
      } else {
        arrow = <FontAwesome style={faStyle} name="long-arrow-down"/>
      }
    }

    return (
      <span
        className="ho-datagrid-header-col"
        style={ Object.assign({}, styles, this.props.col.headerStyle)}
        onMouseOver={isColSortable && this.handleMouseOver}
        onMouseOut={isColSortable && this.handleMouseOut}
        onClick={isColSortable && this.onClick.bind(this, col.dataKey)}
      >
        <div className="ho-datagrid-header-cell">
          <span>{col.text}</span>
        </div>
        {arrow}
        <div className="ho-datagrid-header-divider" />
      </span>
    )
  }

  private handleMouseOver: React.MouseEventHandler = (event: React.MouseEvent) => {
    this.setState({ hovered: true })
  }

  private handleMouseOut: React.MouseEventHandler = (event: React.MouseEvent) => {
    this.setState({ hovered: false })
  }

  private onClick: Function = (dataKey: string, event: React.MouseEvent) => {
    if (this.props.sortAscending) {
      this.props.onClick(dataKey, "desc", event)
    } else {
      this.props.onClick(dataKey, "asc", event)
    }
  }
}

export { DGHeaderColumn }
