/**
 * Created by RSH on 07.05.2016.
 */

import * as React from "react";
import { CheckboxEmptySvg, CheckboxCheckedSvg } from "../svg-icons/CheckboxSvg";

interface IProps {
  /**
   * Describes if the checkbox is checked or not
   * to be passed as a prop from the parent
   */
  checked: boolean;
  /**
   * Parent handler action for checkbox click action
   */
  handler: Function;
}

interface IState {
  switched: boolean;
}

class Checkbox extends React.Component < IProps, IState > {
  state: IState = {
    switched: false
  };

  constructor ( props: IProps ) {
    super( props );
  }

  componentWillReceiveProps ( nextProps: IProps ) {
    this.setState( {
      switched: this.props.checked !== nextProps.checked ?
                nextProps.checked :
                this.state.switched,
    } );
  }

  render () {
    const CheckboxElement: React.ReactElement = this.state.switched ?
                                                React.createElement( CheckboxCheckedSvg, {} ) :
                                                React.createElement( CheckboxEmptySvg, {} );

    return (
      <div>
        <input type="checkbox" style={{ display : "none" }} checked={this.props.checked} onClick={this.props.handler}/>
        {CheckboxElement}
      </div>
    );
  }
}

export { Checkbox };
