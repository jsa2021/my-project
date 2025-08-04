import { createSlice, createSelector } from '@reduxjs/toolkit';

const selectEventsList  = state => state.events.list;
const selectFilterDate   = state => state.events.filterDate;
const selectFilterStatus = state => state.events.filterStatus;

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    list:  [],
    filterDate: null,
    filterStatus: ''
  },
  reducers: {
    setFilterDate(state, action) {
      state.filterDate = action.payload;
    },
    setFilterStatus(state, action) {
      state.filterStatus = action.payload;
    },
    loadEvents(state, action) {
      state.list = action.payload;
    },
    addEvent(state, action) {
      state.list.push(action.payload);
    },
    updateEvent(state, action) {
      const updated = action.payload;
      const idx = state.list.findIndex(evt => evt.id === updated.id);
      if (idx !== -1) state.list[idx] = updated;
    },
    deleteEvent(state, action) {
      state.list = state.list.filter(evt => evt.id !== action.payload);
    }
  }
});



export const {
  setFilterDate,
  setFilterStatus,
  loadEvents, 
  addEvent,
  updateEvent,
  deleteEvent
} = eventsSlice.actions;

export default eventsSlice.reducer;


export const selectFilteredEvents = createSelector(
  [selectEventsList, selectFilterDate, selectFilterStatus],
  (list, filterDate, filterStatus) => {
    return list.filter(evt => {
      const dateKey = evt.start.slice(0, 10); 
      const matchesDate = !filterDate || dateKey === filterDate;
      const matchesStatus = !filterStatus || evt.estado === filterStatus;
      return matchesDate && matchesStatus;
    });
  }
);
