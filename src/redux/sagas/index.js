import {takeLatest} from 'redux-saga/effects';
import {INITIAL} from '../actions/initialActions';
import {initial} from './initialSagas';

function* rootSagas() {
  yield takeLatest(INITIAL, initial);
}
export default rootSagas;
