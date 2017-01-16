import R from "ramda";
import { imap } from "utils";
import React from "react";
import { Button } from "components";
import EditCollectionRowForm from "../../routes/Forms/EditCollectionRowForm";
import { PGBodyCell } from "./PGBodyCell";
import { transparent, grey100 } from "../_styles/colors";
import { render as renderToDOM } from "react-dom";
import styles from "./common.less";
import { Provider } from "react-redux";
import configureStore from "../../dataflow/configureStore";
import cx from "classnames";

const store = configureStore();

class PGBodyRow extends React.Component {
  constructor() {
    super();
    this.state = { hovered : false, showModal : false };

    this.handleMouseEnter        = this.handleMouseEnter.bind(this);
    this.handleMouseLeave        = this.handleMouseLeave.bind(this);
    this.deleteRow               = this.deleteRow.bind(this);
    this.handleEditClick         = this.handleEditClick.bind(this);
    this.removeModal             = this.removeModal.bind(this);
    this.hideModalOnEsc          = this.hideModalOnEsc.bind(this);
    this.hideModalOnOutsideClick = this.hideModalOnOutsideClick.bind(this);
    this.renderModal             = this.renderModal.bind(this);
    this.getFormFields           = this.getFormFields.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.showModal !== this.state.showModal) this.renderModal(nextState.showModal);
  }

  componentWillUnmount() {
    this.removeModal();
  }

  getFormFields() {
    const getObj = col => {
      const { fieldName, fieldSchema, fieldType, fieldProps, displayText } = col;
      let fieldSub                                                         = undefined;
      if (Array.isArray(fieldSchema) && (fieldSchema.length !== 0)) fieldSub = this.getFormFields(fieldSchema);

      return {
        key   : fieldName,
        type  : fieldType,
        title : displayText,
        props : fieldProps,
        sub   : fieldSub,
      };
    };
    return R.map(getObj, this.props.cols);
  }

  handleMouseEnter() {
    this.setState({ hovered : true });
  }

  handleMouseLeave() {
    this.setState({ hovered : false });
  }

  hideModalOnEsc() {
    let isEscape = false;
    if ("key" in event) {
      isEscape = (event.key === "Escape" || event.key === "Esc");
    } else {
      isEscape = (event.keyCode === 27);
    }

    if (isEscape) {
      this.setState({ showModal : false });
    }
  }

  hideModalOnOutsideClick(event) {
    if (event.target === document.getElementsByClassName("modal")[0]) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ showModal : false });
    }
  }

  handleEditClick(event) {
    this.setState({
      showModal : true,
    });
  }

  removeModal() {
    renderToDOM(<div></div>, document.getElementById("Modal"));
  }

  deleteRow(e) {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete the row?\nID : ${this.props.rowKey}`)) {
      this.props.deleteRow(this.props.rowKey);
    }
  }

  renderModal(showModal) {
    const modalPositionCSS = {
      display         : "block",
      backgroundColor : "rgba(0,0,0,.5)",
      overflowX       : "hidden",
      overflowY       : "auto",
    };

    if (showModal) {
      document.body.style.overflow = "hidden";
      document.getElementById("Modal").addEventListener("click", this.hideModalOnOutsideClick);
      window.addEventListener("keyup", this.hideModalOnEsc);

      renderToDOM(
        <Provider store={store}>
          <div className="modal" style={modalPositionCSS} role="dialog">
            <div className={cx("modal-dialog", "modal-md")}>
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" onClick={(e) => this.setState({ showModal : false })}>
                    <span>&times;</span></button>
                  <h5 className="modal-title">{"Edit Collection Row Form"}</h5>
                </div>
                <div className="modal-body">
                  <EditCollectionRowForm
                    initialValues={this.props.row}
                    fields={this.getFormFields()}
                    toggleModal={e => this.setState({ showModal : false })}
                  />
                </div>
              </div>
            </div>
          </div>
        </Provider>,
        document.getElementById("Modal")
      );
    } else {
      document.body.style.overflow = "auto";
      document.getElementById("Modal").removeEventListener("click", this.hideModalOnOutsideClick);
      window.removeEventListener("keyup", this.hideModalOnEsc);
      this.removeModal();
    }
  }

  render() {
    const { row, cols, colWidths, rowKey } = this.props;
    const mapToPGBodyCells                 = (col, colKey) => <PGBodyCell key={colKey}
                                                                          col={col}
                                                                          colWidth={colWidths[col.fieldName]}
                                                                          row={row}/>;
    const bodyCells                        = imap(mapToPGBodyCells, cols);
    const rowStyle                         = { backgroundColor : this.state.hovered ? grey100 : transparent };

    return (
      <div style={rowStyle}
           className={styles.row}
           data-id={rowKey}
           onMouseEnter={this.handleMouseEnter}
           onMouseLeave={this.handleMouseLeave}
      >
        {bodyCells}
        {
          this.state.hovered &&
          <div style={{ position : "absolute", left : "90%", margin : 5 }} className="btn-group btn-group-sm">
            <Button onClick={this.handleEditClick} faName="edit"/>
            <Button onClick={this.deleteRow} faName="times"/>
          </div>
        }
      </div>
    );
  }
}

PGBodyRow.propTypes = {
  hideModal   : React.PropTypes.bool,
  cols        : React.PropTypes.array.isRequired,
  colWidths   : React.PropTypes.object.isRequired,
  row         : React.PropTypes.object.isRequired,
  rowKey      : React.PropTypes.string,
  toggleModal : React.PropTypes.func,
  deleteRow   : React.PropTypes.func.isRequired,
};
export { PGBodyRow };
