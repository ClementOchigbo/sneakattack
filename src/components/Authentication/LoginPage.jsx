import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {z} from "zod"
import {zodResolver} from '@hookform/resolvers/zod'

import "./LoginPage.css"
import { getUser, login } from '../../services/userServices'
import { Navigate, useLocation } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const schema = z.object({
    email: z.string().email({message: "Please enter valid email address."}).min(3),
    password: z.string().min(8, {message: "password should contain atleast 8 characters."})
})

const LoginPage = () => {
    const [formError, setFormError] = useState("")
   const location = useLocation()
   console.log("Login location", location)
//    let navigate = useNavigate();
   const {register, handleSubmit, formState: {errors}, } = useForm({resolver: zodResolver(schema)});
  
   const onSubmit =  async FormData => {
    try {
         await login(FormData);
         
         const { state } = location
        //  navigate("/");
       window.location = state ? state.form : "/";
        // window.location = "/"
    } catch (err) {
        if (err.response && err.response.status === 400) {
            setFormError(err.response.data.message);
        }
    }
        
    }
   
   
    // const [user, setUser] = useState({
    //     name:"",
    //     phone:""
    // })

//    const passwordRef = useRef(null)
// never forget to import useRef hook
//  const nameRef = useRef(null);
//  const phoneRef = useRef(null)

//  const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(user);
    // const user = {
    //    name:"",
    //    phone: +1 
    // }
    // user.name =nameRef.current.value;
    // user.phone = parseInt(phoneRef.current.value)
    // console.log(user)
 
    if (getUser()) {
        return <Navigate to= "/" />;
    }

  return (
   <section className="align_center form_page">
    <form className="authentication_form" onSubmit={handleSubmit (onSubmit)}> 
        <h2>Login Form</h2>
        <div className="form_inputs">
            <div>
                <label htmlFor="email">Email</label>
                <input type="email"
                // ref={nameRef}
                id='email'
                className='form_text_input' placeholder='Enter your email address'
                // onChange={e => setUser({...user, name: e.target.value})}
                // value={user.name}
                {...register("email")}
                />
                 {errors.email && (<em className="form_error">
                    {errors.email.message}
                 </em>)}
                {/* {errors.name?.type ==="minLength" && <em className="form_error">3 or more characters required</em>}  */}
            </div>
            <div>
                <label htmlFor="password">Password </label>
                <input 
                type="password" 
                // ref={phoneRef}
                // ref={passwordRef}
                id='password'
                className='form_text_input' placeholder='Enter your password' 
                // onChange={e => setUser({...user, phone: parseInt(e.target.value)})}
                // value={user.phone}
                {...register("password")}
                />
                {errors.password && (<em className="form_error">
                    {errors.password.message}
                 </em>)}
                {/* <button type='button' onClick={() => passwordRef.current.type = "password"}>Hide Password</button>
                <button type='button'
                 onClick={() => passwordRef.current.type = "text"}
                >Show Password</button> */}
            </div>

            {formError && <em className='form_error'>{formError}</em>}

            <button type="submit" className='search_button form_submit'>Submit</button>
        </div>
    </form>
   </section>
  )
            };


export default LoginPage
