/**
 * Created by sharavan on 02/06/16.
 */
import * as React from "react";
import { Row } from "../Row/index";
import "./FormFieldFactory.less";

export default class FormFieldFactory {
  public getElement(renderType: string) {
    switch (renderType) {
      case "number":
      case "date":
        return this.NumericCell;
      case "list":
        return this.ListCell;
      case "reference":
        return this.ReferenceCell;
      default:
      case "text":
        return this.TextCell;
    }
  }

  private TextCell(props: any): React.ReactElement<any> {
    const { caption, data, cb } = props;
    const value = (data === undefined) ? "" : data;

    return (
      <Row className="form-field">
        <div className="caption">{caption} : </div>
        <div className="field"><input type="text" value={value} onChange={cb}/></div>
      </Row>
    );
  };

  private NumericCell(props: any): React.ReactElement<any> {
    const { caption, data, cb } = props;
    const value = (data === undefined) ? "" : data;

    return (
      <Row className="form-field">
        <div className="caption">{caption} : </div>
        <div className="field"><input type="number" value={value} onChange={cb}/></div>
      </Row>
    );
  }

  private ReferenceCell(props: any): React.ReactElement<any> {
    const { caption, source, cb, data } = props;
    const valueRefTable = (data === undefined) ? "" : data.refTable.key;
    const valueRefField = (data === undefined) ? "" : data.refField.key;

    const refTableOptions = source.refTableSource.map((o: {key: string|number, val: string}) => {
      return <option key={o.key} value={o.key}>{o.val}</option>;
    });
    refTableOptions.unshift(<option key="-1" value=""></option>);

    const refFieldOptions = source.refFieldSource.map((o: {key: string|number, val: string}) => {
      return <option key={o.key} value={o.key}>{o.val}</option>;
    });
    refFieldOptions.unshift(<option key="-1" value=""></option>);

    return (
      <Row className="form-field">
        <div className="caption">{caption} : </div>
        <div className="field">
          <select onSelect={cb} value={valueRefTable}>{refTableOptions}</select>
        </div>
        <div className="field">
          <select onSelect={cb} value={valueRefField}>{refFieldOptions}</select>
        </div>
      </Row>
    );
  }

  private ListCell(props: any): React.ReactElement<any> {
    const { caption, source, cb, data } = props;
    const value = (data === undefined) ? "" : data.key;

    const options = source.refList.map((o: {key: string|number, val: string}) => {
      return <option key={o.key} value={o.key}>{o.val}</option>;
    });
    options.unshift(<option key="-1" value=""></option>);

    return (
      <Row className="form-field">
        <div className="caption">{caption} : </div>
        <div className="field">
          <select onSelect={cb} value={value}>{options}</select>
        </div>
      </Row>
    );
  }
}
