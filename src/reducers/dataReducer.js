import { FETCH_TODOS, FILTER_TODOS } from "../actions/types";
import _ from "lodash";

export default (state = "loading", action) => {
  switch (action.type) {
    case FETCH_TODOS:
      const data = {
        filter: 'SHOW_ALL',
        items: _.map(action.payload, (value, key) => {
          return Object.assign({}, value, { key });
        })
      };
      return data;

    case FILTER_TODOS:
        return Object.assign({}, state, {
          filter: action.filter
      });

    default:
      return state;
  }
};
