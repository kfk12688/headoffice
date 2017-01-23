import React from "react";
import { toBytes, isDefined } from "utils";

const ImageInput = ({ input, ...rest }) => {
  const { value, onChange }          = input;
  const file                         = value[0];
  if (isDefined(file)) file.preview = URL.createObjectURL(file);

  return (
    <div>
      <label className="custom-file" style={{ width : "100%" }}>
        <input {...rest}
               type="file"
               id="file"
               onChange={onChange}
               className="custom-file-input"
        />
        <span className="custom-file-control"/>
      </label>
      <p className="form-text text-muted">Size must be less than 10 Mb</p>

      {
        file ?
        <div ref={node => { this.imagePlaceholder = node; }}>
          <div>{file.name}&nbsp;{toBytes(file.size, 1)}&nbsp;{file.type}</div>
          <img src={file.preview} width={100} alt="Upload..."/>
        </div> :
        null
      }
    </div>
  );
};

ImageInput.propTypes = {
  input : React.PropTypes.object.isRequired,
};

export { ImageInput };
