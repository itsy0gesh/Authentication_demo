import {configureStore} from '@reduxjs/toolkit';
import navSlice from './slices/navSlice';
import profileSlice from './slices/profileSlice';

export const store = configureStore({
    reducer : {
        navbar : navSlice,
        profile : profileSlice,
    },
});
