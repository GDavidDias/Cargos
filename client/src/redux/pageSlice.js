import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    page:'',
    nivel:''
}

export const pageSlice = createSlice({
    name:'page',
    initialState,
    reducers:{
        setPage:(state,action)=>{
            state.page = action.payload;
        },
        setNivel:(state,action)=>{
            state.nivel = action.payload;
        },
    }
});

export const {setPage, setNivel} = pageSlice.actions;
export default pageSlice.reducer;