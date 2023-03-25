import {
  INITIAL_ERROR,
  INITIAL_LOADING,
  INITIAL_SUCCESS,
} from '../actions/initialActions';

// NOTE: initialReducer
const INITIAL_STATE = {
  isLoading: false,
  data: {},
  isError: null,
};

export const initialReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIAL_LOADING:
      return {...state, isLoading: true};
    case INITIAL_SUCCESS:
      return {...state, isLoading: false, data: action.data, isError: null};
    case INITIAL_ERROR:
      return {...state, isLoading: false, isError: action.errorMessage};
    default:
      return state;
  }
};
