import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postsApi } from '../features/posts/postsApi';

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});

setupListeners(store.dispatch)