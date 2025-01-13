import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Route {
  origin: string;
  destination: string;
  originCoordinates: Location | undefined;
  destinationCoordinates: Location | undefined;
  shapes: any;
  distance: string;
  time: string;
}

interface Location {
  longitude: number;
  latitude: number;
}

interface State {
  currentRoute: Route | null;
  userLocation: Location | null;
}

const initialState: State = {
  currentRoute: null,
  userLocation: null
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

const userLocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setUserLocation(state, action: PayloadAction<Location>) {
      state.userLocation = action.payload;
    },
  },
})

export const { setCurrentRoute } = routeSlice.actions;
export const { setUserLocation } = userLocationSlice.actions;

const store = configureStore({
  reducer: {
    route: routeSlice.reducer,
    location: userLocationSlice.reducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
