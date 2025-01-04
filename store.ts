import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Route {
  origin: string;
  destination: string;
  shapes: any;
}

interface State {
  currentRoute: Route | null;
}

const initialState: State = {
  currentRoute: null,
};

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setCurrentRoute(state, action: PayloadAction<Route>) {
      state.currentRoute = action.payload;
    },
  },
});

export const { setCurrentRoute } = routeSlice.actions;

const store = configureStore({
  reducer: {
    route: routeSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
