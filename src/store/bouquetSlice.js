// store/bouquetSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBouquets, sendLike, getLikers } from "../services/bouquetService";

// ─────────────────────────────────────────────
// 🔄 FETCH BOUQUETS
// ─────────────────────────────────────────────
export const fetchBouquets = createAsyncThunk(
  "bouquets/fetchBouquets",
  async () => {
    return await getBouquets();
  }
);

// ─────────────────────────────────────────────
// ❤️ LIKE
// ─────────────────────────────────────────────
export const likeBouquet = createAsyncThunk(
  "bouquets/likeBouquet",
  async (id) => {
    const data = await sendLike(id); // appelle /toggle-like
    return data; // { bouquet, likesCount, liked }
  }
);
export const fetchLikers = createAsyncThunk(
  "bouquets/fetchLikers",
  async (id) => {
    const data = await getLikers(id); // { likers: [...] }
    return { id, likers: data.likers };
  }
);


const bouquetSlice = createSlice({
  name: "bouquets",
  initialState: {
    list: [],
    loading: false,
    likersMap: {},
     modal: {              // état du modal
      open: false,
      id: null
    }  },

  reducers: {openLikersModal: (state, action) => {
      state.modal.open = true;
      state.modal.id = action.payload;
    },
    closeLikersModal: (state) => {
      state.modal.open = false;
      state.modal.id = null;
    }},

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
          likesCount: b.likers?.length || 0,
          liked: false, // par défaut, à mettre à jour si tu connais l'utilisateur
        }));
      })

      // LIKE
      .addCase(likeBouquet.fulfilled, (state, action) => {
  if (!action.payload || !action.payload.bouquet) return;

  const updatedBouquet = action.payload.bouquet;
  const index = state.list.findIndex(b => b.id === updatedBouquet.id);
  if (index !== -1) {
    state.list[index] = {
      ...state.list[index],
      likesCount: action.payload.likesCount,
      liked: action.payload.liked,
      fleurs: updatedBouquet.fleurs,
    };
  }
}

)
.addCase(fetchLikers.fulfilled, (state, action) => {
  const { id, likers } = action.payload;
  state.likersMap[id] = likers;
});


  },
});

export const { openLikersModal, closeLikersModal } = bouquetSlice.actions;
export default bouquetSlice.reducer;
