import {configureStore} from '@reduxjs/toolkit';
//import userReducer from './userSlice';
import pageReducer from './pageSlice';
//import docuserReducer from './docUserSlice';
//import documentoReducer from './documentoSlice';

const store = configureStore({
    reducer:{
        page:pageReducer
        //user:userReducer,
        //docuser:docuserReducer,
        //documento:documentoReducer
    }
});

export default store;