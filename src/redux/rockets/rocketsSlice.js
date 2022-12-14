/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ROCKETS_URL = 'https://api.spacexdata.com/v3/rockets';

export const fetchRockets = createAsyncThunk(
  'users/fetchRockets',
  async () => {
    if (localStorage.getItem('rocketData') === null) {
      try {
        const response = await axios.get(ROCKETS_URL);
        const rocketsObject = response.data.map((rocket) => {
          const {
            id, rocket_name, description, flickr_images,
          } = rocket;
          return {
            id, rocket_name, description, flickr_images, reserved: false,
          };
        });
        return rocketsObject;
      } catch (err) {
        return err.message;
      }
    }
    return JSON.parse(localStorage.getItem('rocketData'));
  },
);

const initialState = {
  rockets: [],
  status: 'idle',
  error: null,
};

export const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    toggleReserve: (state, action) => {
      const newState = state.rockets.map((rocket) => {
        const { reserved } = rocket;
        if (rocket.id !== action.payload) {
          return rocket;
        }
        return { ...rocket, reserved: !reserved };
      });
      return { ...state, rockets: newState };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rockets = action.payload;
      });
  },
});

export const { toggleReserve } = rocketsSlice.actions;

export default rocketsSlice.reducer;
