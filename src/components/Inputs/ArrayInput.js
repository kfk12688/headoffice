import React, { Component } from "react";
import { Field } from "redux-form";
import { Button, getComponentFromType } from "components";
import { padWithZeros, imap } from "utils";

class ArrayInput extends Component {
  constructor(props) {
    super(props);
    this.state     = {
      fields : {},
    };
    this.getFields = this.getFields.bind(this);
  }

  getFields() {
    const { fields, subKeys }  = this.props;

    const onClickRemoveHandler = (e, index) => {
      e.preventDefault();
      fields.remove(index);
    };

    if (fields.length !== 0) {
      return fields.map((field, idx) => {
        const renderFields = (subField, key) => {
          const { title, type } = subField;
          const props           = subField.props || { required : false, unique : false };
          const renderComponent = getComponentFromType[type](props);

          return (
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">{title}{props.required && <sup>*</sup>}</label>
              <div className="col-sm-9">
                <Field name={`${field}.${key}`} {...renderComponent}/>
              </div>
            </div>
          );
        };

        return (
          <div>
            <div style={{ margin : "8px 0px" }}>
              <strong><u>{padWithZeros(idx + 1, 2)}</u></strong>
              <Button tabIndex="-1"
                      style="danger"
                      faName="times"
                      className="pull-right"
                      onClick={e => onClickRemoveHandler(e, idx)}
              />
            </div>
            {imap(renderFields, subKeys)}
          </div>
        );
      });
    }

    return null;
  }

  render() {
    const { fields, title, limit } = this.props;
    const onClickAddHandler        = e => {
      e.preventDefault();
      fields.push({});
    };
    const canFieldBeAdded          = limit ? fields.length < 1 : true;

    return (
      <div>
        <div style={{ margin : "12px 0" }}>
          <strong><em>{`Enter data into ${title} ${!limit ? "Array" : "Field"}`}</em></strong>
          <Button style="primary" className="pull-right" faName="plus" onClick={e => {
            if (canFieldBeAdded) return onClickAddHandler(e);
            alert("Schema FieldType can hold only one nested entry....");
          }}>
            {`Add ${title}`}
          </Button>
        </div>

        {(fields.length !== 0) && <div>{this.getFields()}</div>}
      </div>
    );
  }
}

ArrayInput.defaultProps = {
  limit : false,
};

ArrayInput.propTypes = {
  limit   : React.PropTypes.bool,
  fields  : React.PropTypes.object,
  subKeys : React.PropTypes.object,
  title   : React.PropTypes.string,
};

export { ArrayInput };
