import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export interface SearchResponse {
    total_results: number;
    page:          number;
    per_page:      number;
    photos:        Photo[];
    next_page:     string;
}

export interface Photo {
    id:               number;
    width:            number;
    height:           number;
    url:              string;
    photographer:     string;
    photographer_url: string;
    photographer_id:  number;
    avg_color:        string;
    src:              Src;
    liked:            boolean;
    alt:              string;
}

export interface Src {
    original:  string;
    large2x:   string;
    large:     string;
    medium:    string;
    small:     string;
    portrait:  string;
    landscape: string;
    tiny:      string;
}


export const imagesApi = createApi({
    reducerPath:'imagesApi',
    baseQuery: fetchBaseQuery({baseUrl:"https://api.pexels.com/v1",headers:{'Authorization':'mhk3Apd1onFbcj3QXDPtVPeu5fXL5KFqURctgdtCAu81fkxwOwcq3qij'}}),
    endpoints: (build)=>({
        searchImages: build.query<SearchResponse,{query:string,per_page:number}>({
            query: ({query,per_page})=> `/search?query=${query}&per_page=${per_page}`
        }),
        getImage: build.query<Photo,string>({
            query: (id)=> `/photos/${id}`
        })
            
        
    })
})

export const {useSearchImagesQuery,useGetImageQuery} = imagesApi