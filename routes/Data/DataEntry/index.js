import EntryForm from "./EntryForm";

const Route = {
  path : "entry/:id",
  getComponent(nextState, replace) {
    require.ensure([], () => {
      replace(null, EntryForm);
    });
  },
};

export default Route;
