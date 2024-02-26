import React, { useCallback, useEffect, useState } from 'react'
// import { jwtDecode } from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'

import userContext from './contexts/UserContext'

import "./App.css"
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { getJwt, getUser } from './services/userServices'
import setAuthToken from './utils/setAuthToken'
import { addToCartAPI, decreaseProductAPI, getCartAPI, increaseProductAPI, removeFromCartAPI } from './services/cartServices'
import 'react-toastify/dist/ReactToastify.css'
import cartContext from './contexts/CartContext';

setAuthToken(getJwt())


const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

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

  const addToCart = useCallback((product, quantity) => {
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id === product._id)

    if (productIndex === -1) {
      updatedCart.push({product: product, quantity: quantity})
    } else {
      updatedCart[productIndex].quantity += quantity
    }

    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
    .then((res) => {
      toast.success("Product Added Succesfully! ")
    }).catch(err => {
      toast.error("Failed to add Product!")
      setCart(cart)
    });
  }, [cart])

  const removeFromCart =useCallback( (id) => {
    const oldCart = [...cart]
   const newCart = oldCart.filter(item => item.product._id !== id)
   setCart (newCart)

   removeFromCartAPI(id).then(res => {
    toast.success(res.data.message);
  }).catch(err => {
    toast.error("Something went wrong!")
    setCart(oldCart)
   })
  }, [cart])

  const updateCart = useCallback ((type, id) => {
    const oldCart = [...cart]
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id === id)

    if (type === "increase") {
      updatedCart[productIndex]
      .quantity += 1
      setCart(updatedCart)

      increaseProductAPI(id).catch(err => {
        toast.error("Something went wrong!")
        setCart(oldCart)
      })
      
    }
    if (type === "decrease") {
      updatedCart[productIndex]
      .quantity -= 1
      setCart(updatedCart)

      decreaseProductAPI(id).catch(err => {
        toast.error("Something went wrong!")});
      
    }
  }, [cart])

  const getCart = useCallback(() => {
    getCartAPI()
    .then(res => {
      setCart(res.data)
    }).catch(err => {
      toast.error("Something went wrong!")
    })
  }, [user])
  useEffect(() => {
    if (user) {
      getCart();
    }
   
  }, [user])

  return (
    <userContext.Provider value={user}>
      <cartContext.Provider value={{cart, addToCart, removeFromCart, updateCart, setCart}}>
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
