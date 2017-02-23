import React, { Component } from "react";

class ImageInput extends Component {
  constructor(props) {
    super();
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.drawDefaultText = this.drawDefaultText.bind(this);
  }

  componentDidMount() {
    this.drawDefaultText();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { value } = nextProps.input;
    if (!value) {
      this.canvas.getContext("2d").clearRect(0, 0, 130, 160);
      this.drawDefaultText();
    }
  }

  onChangeHandler(f) {
    const reader             = new FileReader();
    this.canvas.style.border = "none";
    const ctx                = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, 130, 160);
    reader.onload = e => {
      const dataURL = e.target.result;
      const img     = new Image();
      img.src       = dataURL;
      img.onload    = () => {
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 130, 160);
        this.props.input.onChange(this.canvas.toDataURL("image/jpeg", 0.5));
      };
    };
    reader.readAsDataURL(f);
  }

  drawDefaultText() {
    this.canvas.style.border = "1px dashed";
    const ctx                = this.canvas.getContext("2d");
    ctx.font                 = "100 16px Segoe UI, Roboto";
    ctx.fillText("Preview", 35, 80);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-9">
          <label className="custom-file" style={{ width : "100%" }}>
            <input type="file"
                   onChange={e => this.onChangeHandler(e.target.files[0])}
                   className="custom-file-input"
            />
            <span className="custom-file-control"/>
          </label>
          <p className="form-text text-muted">Size must be less than 2 Mb</p>
        </div>
        <div className="col-md-3">
          <canvas ref={node => { this.canvas = node; }} width={130} height={160}>
            Photo Preview
          </canvas>
        </div>
      </div>
    );
  }
}

ImageInput.propTypes = {
  input : React.PropTypes.object.isRequired,
};

export { ImageInput };
