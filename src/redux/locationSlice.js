import { createSlice } from "@reduxjs/toolkit";
import{fetchLocations,updateLocationAsync,deleteLocationAsync} from './apiCall'
const locationSlice = createSlice({
  name: "locationsRentel",
  initialState: {
    locations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchLocations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    build.addCase(fetchLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.locations = action.payload;

    });
    build.addCase(fetchLocations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    build.addCase(updateLocationAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    build.addCase(updateLocationAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.locations = state.locations.map((location) =>
        location._id === action.payload._id ? action.payload : location
      )
    });
    build.addCase(updateLocationAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    build.addCase(deleteLocationAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    build.addCase(deleteLocationAsync.fulfilled, (state) => {
      state.loading = false;
    });
    build.addCase(deleteLocationAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
   
  },
});

export default locationSlice.reducer;
