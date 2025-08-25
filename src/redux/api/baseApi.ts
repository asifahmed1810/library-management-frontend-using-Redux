import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi=createApi({
    reducerPath:"baseApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://library-management-api-nu-nine.vercel.app/"}),
    tagTypes:["task"],
    endpoints:(builder)=>({
        getTask:builder.query({
            query:()=>"api/books",
            providesTags:["task"]
        }),
        createTask:builder.mutation({
           query:(taskData)=>({
            url:"api/books",
            method:"POST",
            body:taskData
           }),
           invalidatesTags:["task"]
        }),

        updateTask:builder.mutation({
            query:({id,...updateData})=>({
                url:`api/books/${id}`,
                method:"PATCH",
                body:updateData,
            }),
            invalidatesTags:["task"]
        }),

        deleteTask:builder.mutation({
            query:(id)=>({
                url:`api/books/${id}`,
                method:'DELETE',

            }),
            invalidatesTags:['task']
        }),



        getTask1:builder.query({
            query:()=>"api/borrow",
            providesTags:["task"]

        }),
        createTask1:builder.mutation({
            query:(taskData)=>({
                url:"api/borrow",
                method:"POST",
                body:taskData
            }),
            invalidatesTags:["task"]
        })
    

}) 
});

export const {useGetTaskQuery,useCreateTaskMutation,useUpdateTaskMutation,useDeleteTaskMutation,useGetTask1Query,useCreateTask1Mutation}=baseApi;