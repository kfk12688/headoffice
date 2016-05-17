/**
 * Created by RSH on 06.05.2016.
 */

import * as React from "react";

interface IProps {
  /**
   * Describes the type of card that needs to be rendered
   * lg - renders a large rectangular card element
   * sm - renders a regular card element (narrow template)
   */
    type: string;

}

class Card extends React.Component <IProps, {}> {
  constructor(props: IProps) {
    super(props);
  };

  render(): JSX.Element {
    return (
      <div></div>
    );
  }
}

export {Card}
