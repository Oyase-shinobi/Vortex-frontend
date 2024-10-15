import thunk from 'redux-thunk';
import { configureStore, Middleware, Store } from '@reduxjs/toolkit';
import { FLUSH, PERSIST, persistReducer, persistStore } from 'redux-persist';
import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';
import { PersistConfig } from 'redux-persist/lib/types';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import RootReducer from '@/store/reducer';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  whitelist: [],
  storage: createWebStorage('local'),
  transforms: [],
  debug: true,
};

const PersistedReducer = persistReducer(persistConfig, RootReducer);

const isClient = typeof window !== 'undefined';

const makeStore = () => {
  const middlewareList = [thunk] as Middleware[];
  const syncConfig = {
    whitelist: [],
    // blacklist: [PERSIST, FLUSH]
  };

  if (isClient) {
    middlewareList.push(createStateSyncMiddleware(syncConfig));
  }

  const ignore = {
    ignoredActions: [PERSIST, FLUSH],
    ignoredPaths: [],
  };

  return configureStore({
    reducer: PersistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // serializableCheck: isClient ? ignore : false,
        serializableCheck: false,
      }).concat(middlewareList),
    devTools: process.env.NODE_ENV === 'development',
  });
};

const store: Store = makeStore();

if (isClient) {
  initMessageListener(store);
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
