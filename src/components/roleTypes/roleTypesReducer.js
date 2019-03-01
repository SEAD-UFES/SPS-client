import { ROLETYPES_LOADING, GET_ROLETYPES } from "./roleTypesActionTypes";

const initialState = {
  loading: false,
  roleTypes: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ROLETYPES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ROLETYPES:
      return {
        ...state,
        loading: false,
        roleTypes: action.payload
      };
    default:
      return state;
  }
}
