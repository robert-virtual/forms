import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, ListItem, ListItemIcon, ListItemText, Pagination, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useSearchImagesQuery } from "~/features/images/imageApi";
import { setToolbarOptions } from "~/features/toolbarOptions/toolBarOptions";
import { estadoOptions } from "./lote";

export default function Lotes() {
    const navigate = useNavigate();
    const { data, error, isLoading } = useSearchImagesQuery({query:'land',per_page:20})
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setToolbarOptions({componentKey:"default"}))
    },[])
   return (
        <>
        <section className="mt-15 flex justify-end">
            <Button variant="outlined" onClick={()=>navigate('newForm')} >Agregar nuevo lote</Button>
        </section>
        {
            isLoading ? (
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{marginTop:'1rem'}}>
                {
                    Array.from(new Array(10)).map((_,i)=>(
                        <Grid key={i.toString()} size={{ xs: 4, sm: 4, md: 4 }}>
                            <Skeleton variant="rounded" width={"100%"} height={200} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Skeleton width={"60%"} variant="text" sx={{ fontSize: '1rem' }} />
                        </Grid>
                    ))
                }
                </Grid>
            ) : (
                <>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{marginTop:'1rem'}}>
                    {
                        data?.photos.map((photo,idx)=>{
                            const i = Math.round((Math.random())*2) 
                            const opt = estadoOptions[i]
                            return (
                            <Grid key={idx.toString()} size={{ xs: 4, sm: 4, md: 4 }}  >
                                <Card sx={{ maxWidth: '100%'}}  >
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={photo.src.original}
                                        title={"lote " + photo.id}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        lote {photo.id}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{justifyContent:'space-between'}}>
                                    <Link to={"/home/lote/" + photo.id}>
                                        <Button size="small">Editar</Button>
                                    </Link>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        {opt.icon} 
                                        {opt.label}
                                    </Box>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                        })
                    }
                </Grid>
                <Pagination sx={{marginTop:'1rem'}} count={10} />
                </>
            )
        }
        </>
   ) 
}