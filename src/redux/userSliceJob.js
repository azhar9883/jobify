import { createSlice } from "@reduxjs/toolkit";

const userSliceJob = createSlice({
  name: "usersJob",
  initialState: {
    usersJob: []
  },
  reducers: {
    getUserJob: (state, action) => {
      state.usersJob = action.payload.map(user => {
        return { id: user._id, title: user.title, description: user.description, company: user.company, location: user.location,salary:user.salary }
      })
    },
    addUserJob: (state, action) => {
      state.usersJob.push(action.payload)
    },
    updateUserJob: (state, action) => {
      const index = state.usersJob.findIndex(x => x.id === action.payload.id)
      state.usersJob[index] = {
        id:action.payload.id,
        title:action.payload.title,
        description:action.payload.description,
        company:action.payload.company,
        location:action.payload.location,
        salary:action.payload.salary
    } 
    },
    deleteUserJob:(state,action)=>{
      const id = action.payload.id
      state.usersJob = state.usersJob.filter(u =>u.id!==id)
    }
  }
})

export const { getUserJob, addUserJob, updateUserJob,deleteUserJob } = userSliceJob.actions;
export default userSliceJob.reducer;