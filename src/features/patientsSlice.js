import { createSlice } from "@reduxjs/toolkit";
import { patientsApi } from "../services/patientsApi";

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    list: [],      
    filter: "",    
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      patientsApi.endpoints.getPacientes.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      }
    );
  },
});

export const { setFilter } = patientsSlice.actions;
export default patientsSlice.reducer;

export const selectFilteredPacientes = (state) => {
  const { list, filter } = state.patients;
  if (!filter) return list;
  const lower = filter.toLowerCase();
  return list.filter((p) =>
    p.nombre.toLowerCase().includes(lower)
  );
};
