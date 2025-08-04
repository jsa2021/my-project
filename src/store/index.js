import { configureStore } from '@reduxjs/toolkit'
import patientsReducer from '../features/patientsSlice'
import eventsReducer from '../features/eventsSlice'
import usersReducer from '../features/userSlice'
import { patientsApi } from '../services/patientsApi';

import { authApi }     from '../services/authApi'
import { userApi }     from '../services/userApi'

export const store = configureStore({
  reducer: {

    patients: patientsReducer,
    events:   eventsReducer,
    user:      usersReducer,
    [patientsApi.reducerPath]: patientsApi.reducer,
    [authApi.reducerPath]:      authApi.reducer, 
    [userApi.reducerPath]:      userApi.reducer, 
  },
  
   middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware()
      .concat(patientsApi.middleware, authApi.middleware, userApi.middleware),
});


export const selectPacientes = (state) => state.pacientes
export const selectUser      = (state) => state.user


export default store
