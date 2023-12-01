import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'
import AuthRedux from 'src/app/modules/auth/redux/AuthRedux'
import QueriesRedux from 'src/app/modules/queries/redux/QueriesRedux'
// import RolesRedux from 'src/app/modules/role-management/redux/RolesRedux'

export const rootReducer = combineReducers({
  auth: AuthRedux.reducer,
  queries: QueriesRedux.reducer,
  // roles: RolesRedux.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([AuthRedux.saga()])
}
