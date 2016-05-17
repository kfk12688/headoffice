import * as React from "react";

function getStyles(props: IProps): Object {
  return {
    width: props.size * 100 / 12 + "%",
  };
}

interface IProps {
  children?: React.ReactNode;
  /**
   * Specifies the col width (of 12 column grid)
   */
  size: number;
  /**
   * custom CSS style properties
   */
  style?: Object;
}

const Col: React.StatelessComponent<IProps> = (props: IProps) => {
  const { children, style } = props;
  return (
    <div
      style={ Object.assign({}, getStyles(props),style) }
      className="col"
    >
      {children}
    </div>
  );
};

Col.displayName  = "Col";
Col.defaultProps = {
  size: 1,
};

export { Col }
