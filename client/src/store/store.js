import { configureStore } from '@reduxjs/toolkit';
import { quizApi } from './api/quizApi';
import quizReducer from './slices/quizSlice';

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApi.middleware),
});