/**
 * Created by sharavan on 15/05/16.
 */
import * as React from "react";
import { Row } from "components/index";
const cx = require("classnames")

const Breadcrumb: React.StatelessComponent<{rollUp: boolean}> = (props) => {
  return (
    <Row
      className={cx("ho-breadcrumbs", { "rolled-up" : props.rollUp })}
    />
  )
}

export { Breadcrumb }
