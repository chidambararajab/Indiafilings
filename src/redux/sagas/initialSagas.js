import {put, call} from 'redux-saga/effects';
import {
  initialError,
  initialLoading,
  initialSuccess,
} from '../actions/initialActions';
import {initialService} from '../services/initialServices';

export function* initial(params) {
  yield put(initialLoading());
  try {
    const response = yield call(initialService, params.params);
    yield put(initialSuccess(response));
  } catch (error) {
    yield put(initialError('Something went Wrong Please try again'));
  }
}
