import axios from "axios";

// for creating food
export const creatFood =(title,price,image,category) =>async(dispatch) =>{
    try {
        dispatch({
            type: 'foodsRequest'
        })

        const { data } = await axios.post(`items/create-foods`, {
            title,price,image,category
        },{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
        dispatch({
            type: 'foodsSuccess',
            payload: data.message
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: "foodsFail",
            payload: error.response.data.message,
        });
    }
}

// for getting food
export const getAllFood =() =>async(dispatch,getState) =>{
   
    try {
        dispatch({
            type: 'getAllFoodsRequest'
        })

        const { data } = await axios.get(`/items/foods`)
        dispatch({
            type: 'getAllFoodsSuccess',
            payload: data.food
        })
        // console.log(data)
    } catch (error) {
        console.log(error)
        dispatch({
            type: "getAllFoodsFail",
            payload: error.response.data.message,
        });
    }
}

// for updating food
export const upateFood =(title,price,image,category,id) =>async(dispatch) =>{
    try {
        dispatch({
            type: 'updateFoodsRequest'
        })

        const { data } = await axios.put(`/items/update-foods/${id}`, {
            title,price,image,category
        },{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
        dispatch({
            type: 'updateFoodsSuccess',
            payload: data.food
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: "updateFoodsFail",
            payload: error.response.data.message,
        });
    }
}

// for deleting food
export const deleteFood = (_id) =>async(dispatch) =>{
    try {
        dispatch({
            type: 'deleteFoodsRequest'
        })

        const { data } = await axios.delete(`/items/delete-foods/${_id}`,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
        dispatch({
            type: 'deleteFoodsSuccess',
            payload: data.message
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: "deleteFoodsFail",
            payload: error.response.data.message,
        });
    }
}