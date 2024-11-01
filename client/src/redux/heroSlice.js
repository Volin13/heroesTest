import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllHeroes, getHeroById } from '../http/heroApi';

const initialState = {
  heroList: {
    rows: [],
    totalPages: 0,
    count: 0,
  },
  selectedHero: null,
  loading: false,
  error: null,
  currentPage: 1,
};

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  async ({ currentPage, limit }) => {
    const heroes = await getAllHeroes(currentPage, limit);
    return heroes;
  },
);

export const fetchHeroById = createAsyncThunk(
  'heroes/fetchHeroById',
  async id => {
    const hero = await getHeroById(id);
    return hero;
  },
);

const heroSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setHeroList: (state, action) => {
      state.heroList = [...action.payload];
    },
    setSelectedHero: (state, action) => {
      state.selectedHero = { ...action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHeroes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.loading = false;
        state.heroList = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchHeroById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedHero = action.payload;
      })
      .addCase(fetchHeroById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setHeroList, setSelectedHero } =
  heroSlice.actions;

export default heroSlice.reducer;
