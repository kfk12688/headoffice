import React from "react";
import moment from "moment";
import cx from "classnames";
import styles from "./_styles/common.less";
import { isNil, isObject, isArray, dataURItoBlob, has, assoc, props, prop, map, round } from "utils";
import { TextInput, DateInput, IntegerInput, CheckboxInput, DecimalInput, SchemaArrayInput, SelectInput, SchemaInput, StaticSelectInput, ImageInput, TimeStampInput, Button, ActiveLink, Labels, ButtonLikeLink, Actionable, CheckboxIcon, FavoriteIcon } from "components";

const RAValue = ({ value }) => <div className={styles.alignRight}><span>{value}</span></div>;
const LAValue = ({ value }) => <div className={styles.alignLeft}><span>{value}</span></div>;
const format  = (fn, v) => {
  if (isNil(v)) return null;
  if (isNil(fn)) return moment.utc(v).local().format("DD-MM-YYYY");
  return fn(v);
};

const arbWidth       = 12;
const componentsHash = {
  integer        : {
    input  : () => ({ component : IntegerInput }),
    render : (value) => <RAValue value={value}/>,
    size   : (data) => {
      if (data) return data.toString().length * arbWidth;
      return 50;
    },
  },
  decimal        : {
    input  : () => ({ component : DecimalInput }),
    render : (value) => <RAValue value={round(2, value)}/>,
    size   : (data) => {
      if (data) return data.toString().length * arbWidth;
      return 50;
    },
  },
  date           : {
    input  : () => ({ component : DateInput }),
    render : (value, col) => <LAValue value={format(col.cellFormatter, value)}/>,
    size   : (data) => 140,
  },
  time           : {
    input  : () => ({ component : TimeStampInput }),
    render : (value, col) => <LAValue value={format(col.cellFormatter, value)}/>,
    size   : (data) => 120,
  },
  text           : {
    input  : () => ({ component : TextInput }),
    render : (value) => <LAValue value={value}/>,
    size   : (data) => {
      if (data) return data.toString().length * arbWidth;
      return 50;
    },
  },
  list           : {
    input  : (meta) => ({ component : StaticSelectInput, options : meta.options }),
    render : (value) => <LAValue value={value}/>,
    size   : (data) => {
      if (data) return data.toString().length * arbWidth;
      return 50;
    },
  },
  longtext       : {
    input  : () => ({ component : TextInput }),
    render : (value) => <LAValue value={value}/>,
    size   : (data) => {
      if (data) return data.toString().length * arbWidth;
      return 50;
    },
  },
  boolean        : {
    input  : () => ({ component : CheckboxInput }),
    render : (value) => <LAValue value={value}/>,
    size   : () => 25,
  },
  image          : {
    input  : () => ({ component : ImageInput }),
    render : (img) => {
      const blob = dataURItoBlob(img);
      const url  = window.URL.createObjectURL(blob);
      return (
        <a href={url} target="_blank">
          <img src={img} alt="thumbnail" height={60}/>
        </a>
      );
    },
    size   : () => 100,
  },
  reference      : {
    input  : (meta) => {
      const wrapper = { component : SelectInput };
      const hasApi  = has("tableRef", meta) && has("fieldRef", meta);
      if (hasApi) {
        const [tableRef, fieldRef] = map(prop("id"), props(["tableRef", "fieldRef"], meta));
        return assoc("api", `/api/list/items/${tableRef}/${fieldRef}`, wrapper);
      }
      return { component : SelectInput };
    },
    size   : () => 150,
    render : value => <LAValue value={!!value && value.label}/>,
  },
  schema         : {
    input  : () => ({ component : SchemaInput }),
    render : (value) => <LAValue value={!!value && value.toString()}/>,
    size   : () => 150,
  },
  schemaArray    : {
    input  : () => ({ component : SchemaArrayInput }),
    render : (value) => <LAValue value={!!value && value.toString()}/>,
    size   : () => 150,
  },
  // components without inputs
  checkbox       : {
    render : (value) => <CheckboxIcon value={value}/>,
  },
  favorite       : {
    render : (value, col, id) => <Button className={styles.favoriteBtn}
                                         onClick={() => col.action(id)}
    >
      <FavoriteIcon value={value}/>
    </Button>,
  },
  buttonLikeLink : {
    render : (value, col, id) => {
      const { actions, link, buttonLink } = col;
      const linkPath                      = `/${link.absolutePath}/${id}`;
      const buttonLikeLinkPath            = `/${buttonLink.absolutePath}/${id}`;
      return (
        <div className={styles.inlContainer}>
          <ActiveLink link={linkPath} text={value}/>
          <div className={cx("btn-group", styles.inlContainerElem)}>
            <ButtonLikeLink buttonText={buttonLink.text} link={buttonLikeLinkPath}/>
            <Actionable actions={actions} id={id}/>
          </div>
        </div>
      );
    },
  },
  link           : {
    render : (value, col, id) => {
      const { actions, link } = col;
      const linkPath          = `/${link.absolutePath}/${id}`;
      return (
        <div className={styles.inlContainer}>
          <ActiveLink link={linkPath} text={value}/>
          <Actionable className={styles.inlContainerElem} actions={actions} id={id}/>
        </div>
      );
    },
  },
  action         : {
    render : (_, col, id) => <Actionable actions={col.actions} id={id}/>,
  },
  label          : {
    render : (value) => {
      if (isObject(value) || isArray(value)) return (<Labels value={value}/>);
      return null;
    },
  },
};

export default componentsHash;
