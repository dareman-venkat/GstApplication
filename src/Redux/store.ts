import RootReducer from './Reducer/reducers';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    GlobalRedux: RootReducer,
  },
});

export default store;
