const decorator = (React, connect) =>
  (config, mapStateToProps, mapDispatchToProps) =>
    WrappedComponent => {
      const { Component } = React;

      class DecoratorClass extends Component {
        constructor() {
          super();
          this.getFields = this.getFields.bind(this);
          this.getValues = this.getValues.bind(this);
        }

        componentWillUnmount() {
          this.props.destroyForm();
        }

        getFields() {
          function get(field, fieldsArray, props) {
            const { formStore, onChange } = props;
            const value = (formStore[field] !== undefined) && (formStore[field].value !== undefined) ?
                          formStore[field].value :
                          "";

            return {
              value,
              name     : field,
              onChange : onChange.bind(null, field),
            };
          }

          let fields = null;
          if (this.props.fields !== undefined) {
            fields = this.props.fields;
          } else if (config.fields !== undefined) {
            fields = config.fields;
          } else {
            console.error("Fields is not defined");
          }

          const decoratedFields = {};
          for (let i = 0; i < fields.length; i++) {
            const fieldArray = fields[i].split(".");

            let o = decoratedFields;
            const lastIndex = fieldArray.length - 1;
            for (let j = 0; j < fieldArray.length; j++) {
              const key = fieldArray[j];
              if (j === lastIndex) {
                if (!(key in o)) o[key] = get(key, null, this.props);
              } else {
                if (!(key in o)) o[key] = {};
              }
              o = o[key];
            }
          }

          return decoratedFields;
        }

        getValues() {
          const { formStore } = this.props;

          const keys = Object.keys(formStore);
          const values = {};

          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            values[key] = formStore[key].value;
          }

          return values;
        }

        render() {
          // eslint-disable-next-line no-unused-vars
          const { fields, formStore, onChange, ...others } = this.props;

          const mergedProps = {
            ...others,
            fields : this.getFields(),
            values : this.getValues(),
          };

          return <WrappedComponent {...mergedProps}/>;
        }
      }

      DecoratorClass.propTypes = {
        fields      : React.PropTypes.arrayOf(React.PropTypes.string),
        formStore   : React.PropTypes.any.isRequired,
        onChange    : React.PropTypes.func.isRequired,
        resetForm   : React.PropTypes.func.isRequired,
        destroyForm : React.PropTypes.func.isRequired,
      };

      return connect(mapStateToProps, mapDispatchToProps)(DecoratorClass);
    };

export default decorator;
