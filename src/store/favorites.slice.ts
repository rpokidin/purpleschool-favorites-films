import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmCardProps } from '../components/FilmCard/FilmCard.props';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { films: [] as FilmCardProps[], count: 0 },
  reducers: {
    addToFavorites: (state, action: PayloadAction<FilmCardProps>) => {
      state.films.push(action.payload);
      state.count += 1;
    },
    removeFromFavorites: (state, action: PayloadAction<{ id: number }>) => {
      state.films = state.films.filter(film => film.id !== action.payload.id);
      state.count -= 1;
    },
    clearFavorites: (state) => {
      state.films = [];
      state.count = 0;
    }
  }
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
