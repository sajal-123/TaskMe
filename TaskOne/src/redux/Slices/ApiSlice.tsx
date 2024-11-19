import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API URL
const API_URL: string = "http://localhost:5000/api";

// Define the base query with the API URL
const baseQuery = fetchBaseQuery({ baseUrl: API_URL });

// Create an API slice using createApi
export const apiSlice = createApi({
  reducerPath: 'api', // This will be the key for the API slice reducer
  baseQuery, // Pass the base query to the slice
  tagTypes: ['Posts'], // Define the types of tags for caching and refetching
  endpoints: (builder) => ({
    // Define an endpoint to fetch data
    getPosts: builder.query({
      query: () => '/posts', // Endpoint path
      providesTags: ['Posts'], // The tags that this query provides
    })
  }),
});

// Export hooks for each endpoint to use in your components
export const { useGetPostsQuery } = apiSlice;
