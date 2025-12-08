import { createSlice, createAsyncThunk

 } from "@reduxjs/toolkit"; 
 import { getUserInfo } from "../services/userService";
 

 export const fetchMe = createAsyncThunk("user/fetchMe", async () => {
  const data = await getUserInfo();  // appelle ton myFetch
  return data?.user || null;         // si pas connecté → null
});
const initialState = { user: null, isAuthenticated: undefined, loading: false };
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
                  state.isAuthenticated = true;  
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },

        
    
    extraReducers: (builder) => {
        builder
   .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
         state.isAuthenticated = !!action.payload;  // 🔥 stocke l'utilisateur dans Redux
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
}});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;