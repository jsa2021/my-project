import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseRTDBURL = process.env.EXPO_PUBLIC_BASE_RTDB_URL;

export const patientsApi = createApi({
  reducerPath: 'patientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseRTDBURL }),
  endpoints: (builder) => ({
    getPacientes: builder.query({
      query: () => 'patients.json',
      transformResponse: (response) => {
        if (!response) return [];
        return Object.entries(response).map(([id, paciente]) => ({
          id,
          ...paciente,
        }));
      },
    }),
  }),
});

export const { useGetPacientesQuery } = patientsApi;
