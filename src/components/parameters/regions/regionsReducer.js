import { REGIONS_LOADING, GET_REGIONS } from "./regionsActionTypes";

const initialState = {
  loading: false,
  regions: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_REGIONS:
      return {
        ...state,
        loading: false,
        regions: action.payload
      };
    default:
      return state;
  }
}
