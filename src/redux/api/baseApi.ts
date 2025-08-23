import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi=createApi({
    reducerPath:"baseApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://library-management-api-nu-nine.vercel.app/api"}),
    endpoints:(builder)=>({
        getTask:builder.query({
            query:()=>"/books"
        })
}) 
});

export const {useGetTaskQuery}=baseApi;