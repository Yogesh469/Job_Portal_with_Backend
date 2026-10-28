import { createSlice } from "@reduxjs/toolkit";
import { getcompany, getData, setcompany, setData } from "../localstorage/localstorage.js";

const jobSlice = createSlice({
    name: "jobs",

    initialState: {
        jobs: getData(),
        companies:getcompany()
    },

    reducers: {
        addJob: (state, action) => {
            state.jobs.push(action.payload);
            setData(state.jobs)
        },

        deleteJob: (state, action) => {
            state.jobs = state.jobs.filter(
                (item) => item.id !== action.payload
            );
            setData(state.jobs)
        },


        updateJob: (state, action) => {
            const index = state.jobs.findIndex(
                (item) => item.id === action.payload.id
            );

            if (index !== -1) {
                state.jobs[index] = action.payload;
                setData(state.jobs)
            }

        },


        addCompany: (state, action) => {
            state.companies.push(action.payload);
            setcompany(state.companies)
        },

        deleteCompany: (state, action) => {
            state.companies = state.companies.filter(
                (item) => item.id !== action.payload
            )

            setcompany(state.companies)

        },


        updatecompany: (state, action) => {
            const index = state.companies.findIndex(
                (item) => item.id === action.payload.id
            )

            if (index !== -1) {
                state.companies[index] = action.payload;
                setcompany(state.companies)
              
            }



        }




    }
});

export const { addJob, deleteJob, updateJob, addCompany, deleteCompany ,updateCompany } = jobSlice.actions

export default jobSlice.reducer