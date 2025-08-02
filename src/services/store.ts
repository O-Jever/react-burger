import { configureStore } from '@reduxjs/toolkit';

import { serverApi } from '@/api/server.api';

import burgerReducer from './reducers/burger';

export const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    burger: burgerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serverApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
