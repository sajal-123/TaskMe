import { apiSlice } from "../ApiSlice";
const AUTH_URL: string = "/user"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (Credentials) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: { ...Credentials },
                credentials: 'include'
            })
        }),
        register: builder.mutation({
            query: (Credentials) => ({
                url: `${AUTH_URL}/register`,
                method: 'POST',
                body: { ...Credentials },
                credentials: 'include'
            })
        })
    })
})


export const { useLoginMutation, useRegisterMutation } = authApiSlice;