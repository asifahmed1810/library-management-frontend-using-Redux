import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi=createApi({
    reducerPath:"baseApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://library-management-api-nu-nine.vercel.app/api"}),
    tagTypes:["task"],
    endpoints:(builder)=>({
        getTask:builder.query({
            query:()=>"/books",
            providesTags:["task"]
        }),
        createTask:builder.mutation({
           query:(taskData)=>({
            url:"/create-book",
            method:"POST",
            body:taskData
           }),
           invalidatesTags:["task"]
        }),
    

}) 
});

export const {useGetTaskQuery,useCreateTaskMutation}=baseApi;