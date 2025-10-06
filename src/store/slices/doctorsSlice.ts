// src/store/slices/doctorsSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Doctor } from '../../types';
import { mockDoctors } from '../../utils/mockData';

interface DoctorsState {
  items: Doctor[];
  filteredItems: Doctor[];
  loading: boolean;
  error: string | null;
  filters: {
    specialty: string;
    searchQuery: string;
    availability: string;
    language: string;
  };
}

const initialState: DoctorsState = {
  items: mockDoctors,
  filteredItems: mockDoctors,
  loading: false,
  error: null,
  filters: {
    specialty: 'all',
    searchQuery: '',
    availability: 'all',
    language: 'all',
  },
};

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setDoctors: (state, action: PayloadAction<Doctor[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },

    setSpecialtyFilter: (state, action: PayloadAction<string>) => {
      state.filters.specialty = action.payload;
      applyFilters(state);
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      applyFilters(state);
    },

    setAvailabilityFilter: (state, action: PayloadAction<string>) => {
      state.filters.availability = action.payload;
      applyFilters(state);
    },

    setLanguageFilter: (state, action: PayloadAction<string>) => {
      state.filters.language = action.payload;
      applyFilters(state);
    },

    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredItems = state.items;
    },

    addDoctor: (state, action: PayloadAction<Doctor>) => {
      state.items.push(action.payload);
      applyFilters(state);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

function applyFilters(state: DoctorsState) {
  let filtered = state.items;

  if (state.filters.specialty !== 'all') {
    filtered = filtered.filter(
      (doctor) => doctor.specialty === state.filters.specialty
    );
  }

  if (state.filters.searchQuery) {
    const query = state.filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query)
    );
  }

  if (state.filters.availability === 'available') {
    filtered = filtered.filter((doctor) => doctor.available);
  }

  if (state.filters.language !== 'all') {
    filtered = filtered.filter((doctor) =>
      doctor.languages.some(
        (lang) => lang.toLowerCase() === state.filters.language.toLowerCase()
      )
    );
  }

  state.filteredItems = filtered;
}

export const {
  setDoctors,
  setSpecialtyFilter,
  setSearchQuery,
  setAvailabilityFilter,
  setLanguageFilter,
  resetFilters,
  addDoctor,
  setLoading,
  setError,
} = doctorsSlice.actions;

export default doctorsSlice.reducer;