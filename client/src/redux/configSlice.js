import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    page:'',
    nivel:{
        id_nivel:'',
        descripcion:''
    }
}

export const configSlice = createSlice({
    name:'config',
    initialState,
    reducers:{
        setPage:(state,action)=>{
            state.page = action.payload;
        },
        setNivel:(state,action)=>{
            const{id_nivel, descripcion} = action.payload[0];
            state.nivel.id_nivel = id_nivel;
            state.nivel.descripcion = descripcion;
        },
    }
});

export const {setPage, setNivel} = configSlice.actions;
export default configSlice.reducer;