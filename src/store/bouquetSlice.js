import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBouquets, sendLike, getLikers } from "../services/bouquetService";

// ─────────────────────────────────────────────
// FETCH BOUQUETS
// ─────────────────────────────────────────────
export const fetchBouquets = createAsyncThunk(
  "bouquets/fetchBouquets",
  async (_, { getState }) => {
    const token = getState().user.token;
    return await getBouquets(token);
  }
);

// ─────────────────────────────────────────────
// LIKE / UNLIKE
// ─────────────────────────────────────────────
export const likeBouquet = createAsyncThunk(
  "bouquets/likeBouquet",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.token;
      return await sendLike(id, token);
    } catch (err) {
      return rejectWithValue("Non autorisé");
    }
  }
);

// ─────────────────────────────────────────────
// LIKERS
// ─────────────────────────────────────────────
export const fetchLikers = createAsyncThunk(
  "bouquets/fetchLikers",
  async (id, { getState }) => {
    const token = getState().user.token;
    const data = await getLikers(id, token);
    return { id, likers: data.likers };
  }
);

// ─────────────────────────────────────────────
// SLICE
// ─────────────────────────────────────────────
const bouquetSlice = createSlice({
  name: "bouquets",
  initialState: {
    list: [],
    loading: false,
    likersMap: {},
    modal: {
      open: false,
      id: null,
    },
  },

  reducers: {
    openLikersModal: (state, action) => {
      state.modal.open = true;
      state.modal.id = action.payload;
    },
    closeLikersModal: (state) => {
      state.modal.open = false;
      state.modal.id = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchBouquets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBouquets.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.map((b) => ({
          ...b,
          likesCount: b.likers ? b.likers.length : 0,
          liked: false,
        }));
      })
      .addCase(fetchBouquets.rejected, (state) => {
        state.loading = false;
        state.list = [];
      })

      // LIKE
      // LIKE
.addCase(likeBouquet.fulfilled, (state, action) => {
  const payload = action.payload;

  if (!payload || !payload.bouquet) return;

  const { bouquet, likesCount, liked } = payload;

  const index = state.list.findIndex(
    (b) => b && b.id === bouquet.id
  );

  if (index !== -1) {
    state.list[index] = {
      ...state.list[index],
      likesCount,
      liked,
      likers: bouquet.likers || state.list[index].likers,
    };
  }
})


      // LIKERS
      .addCase(fetchLikers.fulfilled, (state, action) => {
        const { id, likers } = action.payload;
        state.likersMap[id] = likers;
      });
  },
});

// ✅ EXPORTS OBLIGATOIRES
export const { openLikersModal, closeLikersModal } = bouquetSlice.actions;
export default bouquetSlice.reducer;
