import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: { price: true, change: true, actions: true },
  activeTab: "new",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleColumn(state, action) {
      state.columns[action.payload] = !state.columns[action.payload];
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
  },
});

export const { toggleColumn, setActiveTab } = uiSlice.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer, // <-- VERY IMPORTANT
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
