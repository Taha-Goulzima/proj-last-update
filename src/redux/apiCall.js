import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5001/";

export const postCarRental = createAsyncThunk(
  "content/postCar",
  async (car) => {
    const res = await axios.post(BASE_URL + "car", car);
    const data = await res.data;
    return data;
  }
);

export const fetchCarRental = createAsyncThunk("content/getCars", async () => {
  const res = await axios.get(BASE_URL + "car");
  const data = await res.data;
  return data;
});

export const deleteCarRental = createAsyncThunk(
  "content/deleteCar",
  async (id) => {
    const res = await axios.delete(BASE_URL + "car/" + id);
    const data = await res.data;
    return data;
  }
);

export const editCarRental = createAsyncThunk(
  "content/editCarRental",
  async (car) => {
    const res = await axios.put(BASE_URL + "car/" + car._id, car);
    const data = await res.data;
    return data;
  }
);
// car by id
export const fetchCarRenalDetails = createAsyncThunk(
  "content/fetchCarRenalDetails",
  async (id) => {
    try {
      const res = await axios.get(BASE_URL + "car/" + id);
      const data = await res.data;
      return data;
    } catch (error) {
      console.log("error");
      return error;
    }
  }
);

///  Location
export const fetchLocations = createAsyncThunk(
  "content/allLocation",
  async () => {
    const location = await axios.get(BASE_URL + "locations");
    
    return location.data;
  }
);
export const updateLocationAsync = createAsyncThunk(
  "content/updateLocation",
  async (updatedLocation) => {
    const location = await axios.put(
      BASE_URL + "locations/" + updatedLocation._id,
      updatedLocation
    );
    return location.data;
  }
);
export const deleteLocationAsync = createAsyncThunk(
  "content/deleteLocation",
  async (id) => {
    const location = await axios.delete(BASE_URL + "locations/" + id);
    return location.data;
  }
);
