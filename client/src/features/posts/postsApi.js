import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
    tagTypes: ['Posts'],//caching to avoid refetching    
    endpoints: (builder) => ({
        //Fetch
        getPosts: builder.query({
            query: () => 'posts',
            providesTags: ['Posts']
        }),
        // add
        addPost: builder.mutation({
            query: (post) => ({
                url: 'posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Posts']
        }),
        //update
        updatePost: builder.mutation({
            query: (post) => ({
                url: `posts/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Posts'],
        }),
        //delete
        deletePost: builder.mutation({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Posts'],
        })
    })
})

export const { useGetPostsQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation } = postsApi;