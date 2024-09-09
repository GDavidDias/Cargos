import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import configReducer from './configSlice';
//import docuserReducer from './docUserSlice';
//import documentoReducer from './documentoSlice';

const store = configureStore({
    reducer:{
        config:configReducer,
        user:userReducer
        //docuser:docuserReducer,
        //documento:documentoReducer
    }
});

export default store;