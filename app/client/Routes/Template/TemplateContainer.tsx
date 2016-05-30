/**
 * Created by sharavan on 08/06/16.
 */
import * as React from "react";

class TemplateContainer extends React.Component<{}, {}> {
  render(): JSX.Element {
    return <div>{this.props.children}</div>;
  }

  getBreadcrumbTitle() {
    return <span>All Templates</span>;
  }
}

export { TemplateContainer };
