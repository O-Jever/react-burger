import { configureStore } from '@reduxjs/toolkit'
import burgerReducer from './reducers/burger';
import ingredientFormReducer from './reducers/ingredient-form';
import { serverApi } from '../api/server.api';

export const store = configureStore({
    reducer: {
        [serverApi.reducerPath]: serverApi.reducer,
        burger: burgerReducer,
        ingredientForm: ingredientFormReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(serverApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;