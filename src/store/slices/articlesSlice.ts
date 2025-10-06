// src/store/slices/articlesSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Article } from '../../types';
import { mockArticles } from '../../utils/mockData';

interface ArticlesState {
  items: Article[];
  filteredItems: Article[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
}

const initialState: ArticlesState = {
  items: mockArticles,
  filteredItems: mockArticles,
  loading: false,
  error: null,
  selectedCategory: 'all',
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },

    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      if (action.payload === 'all') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (article) => article.category === action.payload
        );
      }
    },

    searchArticles: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase();
      if (!query) {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (article) =>
            article.title.toLowerCase().includes(query) ||
            article.excerpt.toLowerCase().includes(query) ||
            article.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
    },

    addArticle: (state, action: PayloadAction<Article>) => {
      state.items.unshift(action.payload);
      if (
        state.selectedCategory === 'all' ||
        state.selectedCategory === action.payload.category
      ) {
        state.filteredItems.unshift(action.payload);
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setArticles,
  setCategory,
  searchArticles,
  addArticle,
  setLoading,
  setError,
} = articlesSlice.actions;

export default articlesSlice.reducer;