/**
 * Created by sharavan on 08/06/16.
 */
import * as React from "react";

class UsersContainer extends React.Component<{}, {}> {
  render(): JSX.Element {
    return <div>{this.props.children}</div>;
  }

  getBreadcrumbTitle() {
    return <span>All Users</span>;
  }
}

export { UsersContainer };
