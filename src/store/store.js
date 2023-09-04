import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage for web

import ProfileSlice from './profileSlice';
import RequestSlice from './RequestSlice';
import AddressSlice from './AddressSlice';
import ScheduleSlice from './ScheduleSlice';

const persistConfig = {
  key: 'root', // The key for the root of the storage
  storage, // The storage to use (e.g., localStorage)
};
const persistedReducerForRequest = persistReducer(persistConfig, RequestSlice);
const persistedReducerForProfile = persistReducer(persistConfig, ProfileSlice);
const persistedReducerForAddress = persistReducer(persistConfig, AddressSlice);
const persistedReducerForSchedule = persistReducer(persistConfig, ScheduleSlice);

const store = configureStore({
  reducer: {
    Profile: persistedReducerForProfile,
    Request: persistedReducerForRequest,
    Address: persistedReducerForAddress,
    Schedule:persistedReducerForSchedule,
  },
});

const persistor = persistStore(store);

export { persistor, store };
