import { Box, Button, Card,CardActions,CardContent, CardMedia, Divider, Grid, ListItemIcon, ListItemText, MenuItem, Select, styled, TextField } from "@mui/material";
import { useGetImageQuery, useSearchImagesQuery, type Photo } from "~/features/images/imageApi";
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToolbarOptions } from "~/features/toolbarOptions/toolBarOptions";


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

 export const estadoOptions = [
    { label: "Disponible", value: "disponible", icon: <CheckCircleIcon sx={{ color: "green" }} /> },
    { label: "Reservado", value: "reservado", icon: <HourglassTopIcon sx={{ color: "orange" }} /> },
    { label: "Vendido", value: "vendido", icon: <CancelIcon sx={{ color: "red" }} /> },
  ];


interface ComponentProps{
    params:{
        loteId:string
    }
}
export default function Lote({params:{loteId}}:ComponentProps) {
    const {isLoading,data,} = useSearchImagesQuery({query:'contry house',per_page:3})
    const [images,setImages] = useState<Photo[]>([])
    const {isLoading:isImageLoading,data:imageData} = useGetImageQuery(loteId)
    const [loteNombre,setLoteNombre] = useState("Lote " + loteId)
    const [description,setDescription] = useState("Descripción")
    const [estado,setEstado] = useState('')
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setToolbarOptions({componentKey:"default"}))
    },[])
    useEffect(()=>{
        const i = Math.round((Math.random())*2) 
        const opt = estadoOptions[i]
        setEstado(opt.value)
    },[])
    useEffect(()=>{
        if (!isLoading && data?.photos) {
            setImages(data?.photos)
        }
    },[isLoading,data])

    return (
        <section className="mt-15  ">
            <Box sx={{gap:'1rem',display:'flex',flexDirection:'column'}}>
                <TextField 
                label="Nombre de el lote" 
                variant="standard" 
                value={loteNombre} 
                onChange={({target})=> setLoteNombre(target.value)} />
                <TextField 
                label="Descripción" 
                variant="standard" 
                value={description} 
                onChange={({target})=> setDescription(target.value)} />
                <Select
                    label={"Estado"}
                    value={estado}
                    onChange={({target}) => {
                        setEstado(target.value)
                    }}
                    renderValue={(selected) => {
                    if (!selected) return "Selecciona un estado";
                    const sel = estadoOptions.find((o) => o.value === selected);
                    return (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {sel?.icon}
                        {sel?.label}
                        </Box>
                    );
                    }}
                >
                        {
                            estadoOptions.map((opt,idx)=>(
                                <MenuItem key={idx.toString()}  value={opt.value} >
                                    <ListItemIcon>
                                        {opt.icon}
                                    </ListItemIcon>
                                    <ListItemText>{opt.label}</ListItemText>
                                </MenuItem>
                            ))
                        }
                </Select>
            </Box>

                <Button 
                    component="label"
                    startIcon={<CloudUploadIcon/>}
                    sx={{marginTop:'1rem'}} variant="outlined" onClick={() => {
                    }} >
                    Agregar imagenes
                    <VisuallyHiddenInput type="file" multiple  />
                </Button>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{marginTop:'1rem'}} >
                    {
                        images.map((photo,idx)=>(
                            <Grid key={idx.toString()} size={{ xs: 4, sm: 4, md: 4 }}  >
                                <Card sx={{ maxWidth: '100%'}}  >
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={photo.src.original}
                                        title={"lote " + photo.id}
                                    />
                                    <CardActions>
                                        <Button size="small" onClick={()=>{
                                            setImages(value => value.filter(img=> img.id != photo.id))
                                        }}>Quitar</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
            </Grid>

            <Box sx={{display:"flex",flexDirection:"column",alignItems:'end'}}>

                <Button sx={{marginTop:'1rem'}} variant="outlined" onClick={() => {
                    }} >Guardar Cambios</Button>
            </Box>
        </section>
    )
}