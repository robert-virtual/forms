
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Campo {
    nombre: string;
    tipo: string;
    editing?: boolean;
}

export const tiposCampo = [
    {value: 'texto', label: 'Texto Corto',},
    {value: 'textarea', label: 'Texto Largo'},
    {value: 'numero', label: 'Numero'},
    {value: 'fecha', label: 'Fecha'},
    {value: 'hora', label: 'Hora'},
    {value: 'checkbox', label: 'Casillas'},
    {value: 'radio', label: 'Varias opciones'},
]

const defaultCampo = [{nombre:'',tipo:tiposCampo[0].value,editing:true}];

const camposSlice = createSlice({
    name: 'campos',
    initialState: defaultCampo as Campo[],
    reducers: {
        addCampo: (state, action: PayloadAction<Campo>) => {
            state.push(action.payload);
        },
        setEditingCampo: (state, action: PayloadAction<{ index: number }>) => {
            const { index } = action.payload;
            return state.map((campo,idx)=>idx === index ? {...campo,editing:true}: {...campo,editing:false})
        },
        updateCampo: (state, action: PayloadAction<{ index: number; campo: Campo }>) => {
            const { index, campo } = action.payload;
            state[index] = campo;
        },
        removeCampo: (state, action: PayloadAction<number>) => {
            state.splice(action.payload, 1);
        },
        setCampos: (state, action: PayloadAction<Campo[]>) => {
            return action.payload;
        },
    },
});

export const { addCampo, updateCampo, removeCampo, setCampos,setEditingCampo } = camposSlice.actions;

export default camposSlice.reducer;