import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from './reducer/authReducer'
import { foodReducer } from './reducer/foodReducer'
import {cartReducer} from './reducer/cartReducer'
import { searchReducer } from './reducer/searchReducer'
import { orderReducer } from './reducer/orderReducer'
import { carouselReducer } from './reducer/carouselReducer'

const store = configureStore({
   reducer:{
     auth:authReducer,
     food:foodReducer,
     carousel:carouselReducer,
     cart:cartReducer,
     search:searchReducer,
     order:orderReducer
   }
})

export default store



