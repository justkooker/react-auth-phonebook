import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contactsReducer from './features/phonebook/contactsSlice';
import authReducer from './features/phonebook/authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfigContacts = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};
const persistConfigAuth = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user', 'isAuth'],
};
const rootReducer = combineReducers({
  contacts: persistReducer(persistConfigContacts, contactsReducer),
  auth: persistReducer(persistConfigAuth, authReducer),
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
