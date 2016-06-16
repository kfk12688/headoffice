/**
 * Created by sharavan on 16/06/16.
 */
import * as React from "react";
import { Row, Col, Button, PopupButton, Divider, PopupTextBox } from "components/index";
const cx = require("classnames")

interface IProps {
  actionsMenu: any
  colSortItems: any
  countItems: number
  sortKey: string

  selectAllRows:Function
  clearRowSelection:Function
  toggleSidebar: Function
}

const ContextMenu: React.StatelessComponent<IProps> = (props) => {
  let actionsMenu = undefined;

  if (props.countItems !== 0) {
    actionsMenu = (
      <span>
        <Divider vertical size={{h:24, w:1}} style={{ marginRight: 5 }}/>
        <PopupButton label="Actions">
          <div>Edit Template</div>
          <div>Tag...</div>
          <div>Set Permissions</div>
        </PopupButton>
      </span>
    )
  }

  return (
    <Row fullWidth className="ho-action-container">
      <Col size={6} className="left">
        <span>
          <Button faName="sliders" onClick={props.toggleSidebar}
                  className={cx("icon", {"active" : props.actionsMenu.showSidebar})}/>

          <PopupButton label={props.countItems + " selected"}>
            <div onClick={props.selectAllRows}>Select All</div>
            <div onClick={props.clearRowSelection}>Clear selection</div>
          </PopupButton>
        </span>

        {actionsMenu}
      </Col>

      <Col size={6} className="right">
        <span>Sort by : </span>
        <span className="sort-block">
          <PopupTextBox matchParentWidth label={props.sortKey}>
            {props.colSortItems}
          </PopupTextBox>
        </span>
      </Col>
    </Row>
  )
}

export { ContextMenu }
