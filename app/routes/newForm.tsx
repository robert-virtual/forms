import { Box, Button, Card, CardActionArea, CardContent, Divider, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCampo, setEditingCampo, tiposCampo, updateCampo, type Campo } from "~/features/campos/CamposSlice";
import { setCurrentFormName, setSnackbar } from "~/features/forms/formsSlice";
import { setToolbarOptions } from "~/features/toolbarOptions/toolBarOptions";
import type { RootState } from "~/store";

export default function NewForm() {

    const campos = useSelector((value: RootState) => value.campos)
    const forms = useSelector((value: RootState) => value.forms)

    const dispatch = useDispatch()

    const [nombreCampo, setNombreCampo] = useState('')
    const [tipoCampo, setTipoCampo] = useState('')
    const [editingIndex,setEditigIndex] = useState(0)
    useEffect(()=>{
        dispatch(setToolbarOptions({componentKey:"newFormOptions"}))
        return ()=>{
            dispatch(setToolbarOptions({componentKey:"default"}))
        }
    },[]) 
    useEffect(()=>{
        console.log(campos)
    },[campos])

    function handleCloseSnackbar() {
        dispatch(setSnackbar({message:'',open:false}))
    }
    return (
        <section className="mt-15  ">
            <h2 className="my-5">Nuevo formulario</h2>
            <Card>
                <CardContent>
                    <TextField value={forms.currentFormName} onChange={({target})=>{
                        dispatch(setCurrentFormName(target.value))
                    }} label="Nombre del formulario" variant="standard" />
                </CardContent>
            </Card>
            <Divider />
            <h2 className="my-5">Campos</h2>
            {
                campos.map((campo: Campo, idx) => (
                    <Card key={idx.toString()} sx={{marginTop:'1rem'}} >
                        {
                            campo.editing ?
                                (
                                    <CardContent sx={{display:"flex",justifyContent:"space-between"}} >
                                        <TextField
                                            label="Nombre del campo"
                                            variant="standard"
                                            value={nombreCampo}
                                            onChange={({ target }) => {
                                                setNombreCampo(target.value)
                                                dispatch(updateCampo({ index: idx, campo: { ...campo, nombre: target.value } }))
                                            }}
                                            sx={{ mr: 2 }}
                                        />
                                        <Select
                                            label={campo.nombre}
                                            value={tipoCampo}
                                            onChange={(e) => {
                                                setTipoCampo(e.target.value)
                                                dispatch(updateCampo({ index: idx, campo: { ...campo, tipo: e.target.value } }))
                                            }}
                                        >
                                            <MenuItem disabled selected >Tipo Campo</MenuItem>
                                            {
                                                tiposCampo.map((campoOption, idxOption) => (
                                                    <MenuItem key={idxOption.toString()} value={campoOption.value}>{campoOption.label}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </CardContent>

                                )
                                : (
                                    <CardActionArea onClick={() => {
                                        setNombreCampo(campo.nombre)
                                        setTipoCampo(campo.tipo)
                                        setEditigIndex(idx)
                                        dispatch(setEditingCampo({ index: idx}))
                                    }}>
                                        <CardContent>
                                            <Typography>{campo.nombre}</Typography>
                                            <Typography>{campo.tipo}</Typography>
                                        </CardContent>
                                    </CardActionArea>

                                )
                        }
                    </Card>

                ))
            }
            <Box sx={{display:"flex",flexDirection:"column",}}>

                <Button sx={{marginTop:'1rem'}} variant="outlined" onClick={() => {
                        dispatch(addCampo({ nombre: '', tipo: tiposCampo[0].value,editing:true }))
                        dispatch(setEditingCampo({ index: editingIndex+1}))
                        setEditigIndex(value => value + 1)
                        setNombreCampo('')
                        setTipoCampo('')
                    }} >Agregar campo</Button>
            </Box>
            <Snackbar
              open={forms.snackbarOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
              message={forms.snackbarMsg}
            />
        </section>
    )
}