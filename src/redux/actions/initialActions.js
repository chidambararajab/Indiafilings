// NOTE: initial
export const INITIAL = 'INITIAL';
export const INITIAL_LOADING = 'INITIAL_LOADING';
export const INITIAL_SUCCESS = 'INITIAL_SUCCESS';
export const INITIAL_ERROR = 'INITIAL_ERROR';

export function initial(params) {
  return {
    type: INITIAL,
    params: params,
  };
}

export function initialLoading() {
  return {
    type: INITIAL_LOADING,
  };
}

export function initialSuccess(params) {
  return {
    type: INITIAL_SUCCESS,
    data: params,
  };
}

export function initialError(params) {
  return {
    type: INITIAL_ERROR,
    errorMessage: params,
  };
}
