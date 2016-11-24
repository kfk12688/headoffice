import React from "react";
import { Button } from "../Button/index";
import { render as renderToDOM } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "../../dataflow/configureStore";
import cx from "classnames";
const store = configureStore();

export class Modal extends React.Component {
  constructor() {
    super();
    this.renderModal = this.renderModal.bind(this);
    this.hideModalOnOutsideClick = this.hideModalOnOutsideClick.bind(this);
    this.hideModalOnEsc = this.hideModalOnEsc.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.show !== this.props.show);
  }

  componentDidUpdate() {
    this.renderModal();
  }

  componentWillUnmount() {
    this.removeModal();
  }

  removeModal() {
    renderToDOM(<div></div>, document.getElementById("Modal"));
  }

  hideModalOnEsc() {
    let isEscape = false;
    if ("key" in event) {
      isEscape = (event.key === "Escape" || event.key === "Esc");
    } else {
      isEscape = (event.keyCode === 27);
    }

    if (isEscape) {
      this.props.hideModal();
    }
  }

  hideModalOnOutsideClick(event) {
    if (event.target === document.getElementsByClassName("modal")[0]) {
      event.preventDefault();
      event.stopPropagation();
      this.props.hideModal();
    }
  }

  renderModal() {
    const { show, size = "md", hideModal, modalTitle, caption, children } = this.props;
    const modalPositionCSS = {
      display         : "block",
      backgroundColor : "rgba(0,0,0,.5)",
      overflowX       : "hidden",
      overflowY       : "auto",
    };

    if (show) {
      document.getElementById("Modal").addEventListener("click", this.hideModalOnOutsideClick);
      window.addEventListener("keyup", this.hideModalOnEsc);

      renderToDOM(
        <Provider store={store}>
          <div className="modal" style={modalPositionCSS} role="dialog">
            <div className={cx("modal-dialog", `modal-${size}`)}>
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" onClick={hideModal}><span>&times;</span></button>
                  <h5 className="modal-title">{modalTitle || caption}</h5>
                </div>
                <div className="modal-body">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Provider>,
        document.getElementById("Modal")
      );
    } else {
      document.getElementById("Modal").removeEventListener("click", this.hideModalOnOutsideClick);
      window.removeEventListener("keyup", this.hideModalOnEsc);
      this.removeModal();
    }
  }

  render() {
    const { faName, showModal, title, style, block, caption } = this.props;
    return (
      <Button
        faName={faName}
        onClick={showModal}
        title={title}
        style={style}
        block={block}
      >
        {caption}
      </Button>
    );
  }
}

Modal.propTypes = {
  showModal  : React.PropTypes.func.isRequired,
  hideModal  : React.PropTypes.func.isRequired,
  show       : React.PropTypes.bool,
  size       : React.PropTypes.string,
  style      : React.PropTypes.string,
  faName     : React.PropTypes.string,
  caption    : React.PropTypes.string,
  children   : React.PropTypes.node,
  modalTitle : React.PropTypes.string,
  title      : React.PropTypes.string,
  block      : React.PropTypes.bool,
};
