import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { myFetch } from "../comm/myFetch";

// ===============================
// LOGIN (JWT)
// ===============================
export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }) => {
    return await myFetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  }
);

// ===============================
// ME (JWT)
// ===============================
export const fetchMe = createAsyncThunk("user/fetchMe", async () => {
  const data = await myFetch("/auth/me");
  return data.user || null;
});

// ===============================
// STATE INITIAL
// ===============================
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
};

// ===============================
// SLICE
// ===============================
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Logout JWT → on supprime le token côté client
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // ===============================
      // LOGIN
      // ===============================
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      // ===============================
      // FETCH ME
      // ===============================
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
