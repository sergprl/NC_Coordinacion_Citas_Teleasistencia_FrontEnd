// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import doctorsReducer from './slices/doctorsSlice';
import articlesReducer from './slices/articlesSlice';

export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['articles/setArticles'],
        ignoredPaths: ['articles.items'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;