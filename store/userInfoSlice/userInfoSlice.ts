import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserInfoState {
  unserInfo: {
    id: string;
    levelId: string;
    universityId: string;
    completedChapters: string[];
    score: string;
    name: string;
  };
}

// Define the initial state using that type
const initialState: UserInfoState = {
  unserInfo: {
    id: "",
    levelId: "",
    universityId: "",
    completedChapters: [],
    score: "",
    name: "",
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.unserInfo = { ...action.payload };
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
