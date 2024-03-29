import React, { useCallback, useEffect, useReducer, useState } from 'react'
// import { jwtDecode } from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'

import userContext from './contexts/UserContext'

import "./App.css"
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { getJwt, getUser } from './services/userServices'
import setAuthToken from './utils/setAuthToken'
// import {  decreaseProductAPI, increaseProductAPI,  } from './services/cartServices'
import 'react-toastify/dist/ReactToastify.css'
import cartContext from './contexts/CartContext';
import cartReducer from './reducers/cartReducer'
import useData from './hooks/useData'
import useAddToCart from './hooks/cart/useAddToCart'
import useRemoveFromCart from './hooks/cart/useRemoveFromCart';
import useUpdateCart from './hooks/cart/useUpdateCart'

setAuthToken(getJwt())


const App = () => {
  const [user, setUser] = useState(null);
  // const [cart, setCart] = useState([]);
 const [cart, dispatchCart] = useReducer(cartReducer, [])
 const {data: cartData, refetch} = useData("/cart", null, ["cart"]);

 const addToCartMutation = useAddToCart()
 
 const removeFromCartMutation = useRemoveFromCart()

 const updateCartMutation = useUpdateCart() 

 useEffect(() => {
  if (cartData) {
    dispatchCart({type: "GET_CART", payload:{products: cartData} })
  }
 }, [cartData] )

 useEffect(() => {
  if (user) {
    refetch();
  }
 
}, [user])

  useEffect(() =>{
    try {
      // const jwt = localStorage.getItem("token")
  const jwtUser = getUser();
  if (Date.now() >= jwtUser.exp * 1000) {
    localStorage.removeItem("token")
    location.reload()
  } else{
    setUser(jwtUser);
  }
    } catch (error) {}
   
  }, [] )

  const addToCart = useCallback(
    (product, quantity) => {

      dispatchCart({type: "ADD_TO_CART", payload: {product, quantity}});

      addToCartMutation.mutate({id: product._id, quantity:quantity}, {
        onError: () => {
          toast.error("Something went wrong!!")
          dispatchCart({type: "REVERT_CART", payload: {cart} });
    
        },
      })
    // dispatchCart({type: "ADD_TO_CART", payload: {product, quantity}});
    
    // addToCartAPI(product._id, quantity)
    // .then((res) => {
    //   toast.success("Product Added Succesfully! ")
    // }).catch(err => {
    //   toast.error("Failed to add Product!")
    //   // setCart(cart)
    //   dispatchCart({type: "REVERT_CART", payload: {cart} })
    //});
  }, [cart])

  const removeFromCart =useCallback( (id) => {
  //   const oldCart = [...cart]
  //  const newCart = oldCart.filter(item => item.product._id !== id)
  //  setCart (newCart)
    dispatchCart({type: "REMOVE_FROM_CART", payload:{id} })

    removeFromCartMutation.mutate({id: product._id}, {
      onError: () => {
        toast.error("Something went wrong!!")
        dispatchCart({type: "REVERT_CART", payload:{cart} });
      },
    })

  //  removeFromCartAPI(id).then(res => {
  //   toast.success(res.data.message);
  // }).catch(err => {
  //   toast.error("Something went wrong!");
  //   // setCart(oldCart)
  //   dispatchCart({type: "REVERT_CART", payload: {cart} })
  }, [cart])

  const updateCart = useCallback ((type, id) => {
    // const oldCart = [...cart]
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id === id)

    if (type === "increase") {
      updatedCart[productIndex]
      .quantity += 1
      // setCart(updatedCart)
      

      // increaseProductAPI(id).catch(err => {
      //   toast.error("Something went wrong!")
      //   // setCart(oldCart)
       
      // })
      
    }
    if (type === "decrease") {
      updatedCart[productIndex]
      .quantity -= 1
      // setCart(updatedCart)
      // dispatchCart({type: "GET_CART", payload:{products: updatedCart} })

      // decreaseProductAPI(id).catch(err => {
      //   toast.error("Something went wrong!")});
      //   dispatchCart({type: "REVERT_CART", payload: {cart} })
      
    }
    dispatchCart({type: "GET_CART", payload:{products: updatedCart} })

    updateCartMutation.mutate({id, type}, {
      onError: () => {
        dispatchCart({type: "REVERT_CART", payload: {cart} })
      }
    })
   
  }, [cart])

  // const getCart = useCallback(() => {
  //   getCartAPI()
  //   .then(res => {
  //     // setCart(res.data)
     
  //   }).catch(err => {
  //     toast.error("Something went wrong!")
  //   })
  // }, [user])
 

  return (
    <userContext.Provider value={user}>
      <cartContext.Provider value={{cart,
         addToCart,
          removeFromCart,
           updateCart,
            // setCart
            }}>
    <div className='app'>
      <Navbar  />
      <main>

       <ToastContainer position='bottom-right' />
       <Routing />
      </main>
    </div>
    </cartContext.Provider>
    </userContext.Provider>
  )
}

export default App
