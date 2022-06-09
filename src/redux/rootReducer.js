import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/auth';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['theme'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['isLoading', 'error'],
  whitelist: ['isAuthenticated', 'user'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

const reducers = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    storage.removeItem('redux-auth');
    state = undefined;
  }

  return rootReducer(state, action);
};

export { rootPersistConfig, reducers };