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

interface IState {}

class Card extends React.Component <IProps, IState> {
  static defaultProps = {};

  constructor(props: IProps) {
    super(props);
  };

  render() {
    return (null);
  }
}
