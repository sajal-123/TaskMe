import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API URL
const API_URL: string = import.meta.env.VITE_APP_BASE_URL;

// Define the base query with the API URL
const baseQuery = fetchBaseQuery({ baseUrl: API_URL+"/api" });

// Create an API slice using createApi
export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery, 
  tagTypes: ['Posts'], 
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts', 
      providesTags: ['Posts'], 
    })
  }),
});

// Export hooks for each endpoint to use in your components
export const { useGetPostsQuery } = apiSlice;
