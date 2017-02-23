import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

class Overlay extends React.Component {
  constructor() {
    super();
    this._renderLayer = this._renderLayer.bind(this);
    this._hideOverlay = this._hideOverlay.bind(this);
    //this._stopSelfClose = this._stopSelfClose.bind(this);
  }

  componentDidMount() {
    console.log("OVERLAY COMPONENT IS MOUNTED");
    this.overlayElement              = document.createElement("div");
    this.overlayElement.style.zIndex = 2000;
    document.body.appendChild(this.overlayElement);

    this._renderLayer();
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.show !== this.props.show);
  }

  componentDidUpdate() {
    this._renderLayer();
  }

  componentWillUnmount() {
    console.log("OVERLAY COMPONENT IS GOING TO BE UN-MOUNTED");
    unmountComponentAtNode(this.overlayElement);
    document.body.removeChild(this.overlayElement);
  }

  _getPos(node) {
    const pos = node.getBoundingClientRect();
    return {
      top    : pos.top + pos.height,
      left   : pos.left,
      bottom : pos.bottom,
      right  : pos.right,
      height : pos.height,
      width  : pos.width,
    };
  }

  _hideOverlay(event) {
    if (event.target !== this.overlayElement) {
      this.props.onHide();
    }
  }

  _renderLayer() {
    const { show, target } = this.props;

    if (show) {
      const pos                          = this._getPos(target);
      this.overlayElement.style.position = "absolute";
      this.overlayElement.style.left     = `${pos.left}px`;
      this.overlayElement.style.top      = `${pos.top}px`;
      this.overlayElement.style.width    = `${pos.width}px`;

      window.addEventListener("click", this._hideOverlay);
      window.addEventListener("resize", this._renderLayer);
      //this.overlayElement.addEventListener("click", this._stopSelfClose);

      render(this.props.children, this.overlayElement);
    } else {
      window.removeEventListener("click", this._hideOverlay);
      window.removeEventListener("resize", this._renderLayer);
      //this.overlayElement.removeEventListener("click", this._stopSelfClose);

      render(<div></div>, this.overlayElement);
    }
  }

  render() {
    return null;
  }
}

Overlay.propTypes = {
  show     : React.PropTypes.bool.isRequired,
  onHide   : React.PropTypes.func.isRequired,
  target   : React.PropTypes.any,
  children : React.PropTypes.node,
};
export default Overlay;
