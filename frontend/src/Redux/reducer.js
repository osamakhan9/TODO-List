import { FILTER_TODO, GET_TODO } from "./actions";

const initState = {
  todos: [],
};

export const Reducer = (store = initState, action) => {
  switch (action.type) {
    case GET_TODO:
      return { ...store, todos: action.payload };

    case FILTER_TODO:
      return { ...store, todos: action.payload };

    default: return store;
  }
};
