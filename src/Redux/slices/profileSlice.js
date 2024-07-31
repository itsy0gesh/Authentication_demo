import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  initialState: {
    username: "",
    email: "",
    status: true,
    error:"",
  },
  name: "profile",
  reducers: {
    setProfile: (state, action) => {
      (state.username = action.payload.username),
        (state.email = action.payload.email);
    },
  },
});
export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
