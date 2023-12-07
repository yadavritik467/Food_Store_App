import axios from "axios";
import { selectMyOrder } from "../reducer/orderReducer";

export const createOrder = (orderDetail, amount) => async (dispatch) => {
    try {
        dispatch({
            type: 'orderRequest',
        })
        const { data } = await axios.post("/order/order/new", { orderDetail, amount },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        )
        dispatch({
            type: 'orderSuccess',
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: 'orderFail',
            payload: error.response.data.message,
        })
    }
}

export const myOrder = () => async (dispatch,getState) => {
    const order = selectMyOrder(getState());
    if (order?.length > 0) {
      return;
    }
    try {
        dispatch({
            type: 'getMyOrderRequest'
        })
        const { data } = await axios.get('/order/myOrder', {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        dispatch({
            type: 'getMyOrderSuccess',
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: 'getMyOrderSuccess',
            payload: error.response.data.message,
        })
    }
}


export const allOrder = () => async (dispatch) => {
    try {
        dispatch({
            type: 'getAllOrderRequest'
        })
        const { data } = await axios.get('/order/admin/orders', {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        // console.log(data)
        dispatch({
            type: 'getAllOrderSuccess',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'getAllOrderFail',
            payload: error.response.data.message,
        })
    }
}

export const updateOrder = (id, category) => async (dispatch) => {
    try {
        dispatch({
            type: 'updateAdminOrderRequest'
        })
        const { data } = await axios.put(`/order/admin/update-orders/${id}`, {
            category,
        });
        dispatch({
            type: 'updateAdminOrderSuccess',
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: 'updateAdminOrderFail',
            payload: error.response.data.message,
        })
    }
}

export const deleteOrder = (_id) => async (dispatch) => {
    try {
        dispatch({
            type: 'deleteOrderRequest'
        })
        await axios.delete(`/order/admin/orders/${_id}`);
        dispatch({
            type: 'deleteOrderSuccess'
        })
    } catch (error) {
        dispatch({
            type: 'deleteOrderFail',
            payload: error.response.data.message,
        })
    }
}