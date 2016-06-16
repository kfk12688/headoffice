/**
 * Created by sharavan on 18/05/16.
 */

interface IColProps {
  dataKey?: string;
  name: string;
  text: string;
  renderType?: string;
  sortable?: boolean;
  cellFormatter?: Function;
  headerStyle?: any;
  linkRef?: {
    path: string;
    urlKey: string;
  };
}

type IRowProps = any;

export {
  IColProps,
  IRowProps
};
