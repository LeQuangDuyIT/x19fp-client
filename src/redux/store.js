import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice.js';
import collectionSlice from './collection/collectionSlice.js';
import testSlice from './test/testSlice.js';

export const store = configureStore({
  reducer: {
    user: userSlice,
    collection: collectionSlice,
    test: testSlice
  }
});
