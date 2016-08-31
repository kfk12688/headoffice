import React from "react";
import { connect } from "react-redux";
import decorator from "./decorator";
import { onChange, resetForm, destroy } from "./actions";

const mapStateToProps = state => ({
  formStore : state.form,
});

const mapDispatchToProps = dispatch => ({
  onChange    : (field, value) => dispatch(onChange(field, value)),
  resetForm   : () => dispatch(resetForm()),
  destroyForm : () => dispatch(destroy()),
});

const formDecorator = decorator(React, connect);

export default config => formDecorator(config, mapStateToProps, mapDispatchToProps);
