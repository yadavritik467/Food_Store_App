import axios from "axios";

// create carousel
export const createCarousel = (title,heading,image) =>async(dispatch) =>{
    try {
        dispatch({
            type: "carouselRequest",
        });

        const {data} = await axios.post('/caro/caro-update',{
            title,heading,image,
        },{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
        dispatch({
            type: 'carouselSuccess',
            payload: data.message
        })
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: "carouselFail",
            payload: error.response.data.message,
        });
    }
}

// fetch carousel 
export const getAllCarousel = ()=> async(dispatch) =>{
    try {
        dispatch({
            type: "getAllCarouselRequest",
        });
        const {data} = await axios.get('/caro/caro-get')
        dispatch({
            type: 'getAllCarouselSuccess',
            payload: data.caro
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: "getAllCarouselFail",
            payload: error.response.data.message,
        });
    }
}