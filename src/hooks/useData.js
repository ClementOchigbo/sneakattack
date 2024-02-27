// import React, {useEffect, useState} from 'react'
import apiClient from '../utils/api-client'
import { useQuery } from '@tanstack/react-query'

const useData = (endpoint, customConfig = {}, queryKey, staleTime = 300_000) => {
    const fetchFunction = () => apiClient.get(endpoint,customConfig ).then(res => res.data)
  
//     const[data, setData] = useState(null)
//     const[error, setError] = useState("")
//     const[isLoading, setIsLoading] = useState(false)


//     useEffect(() => {
//         setIsLoading(true)
//       apiClient.get(endpoint, customConfig).then((res)=> {
//         if (endpoint === "/products" && data && data.products && customConfig.params.page !== 1) {
//             setData(prev => ({
//                 ...prev, products: [...prev.products, ...res.data.products]
//             }))
//         }else{
//             setData(res.data);
//         }
       
//         setIsLoading(false)
//     }).catch(err => 
//         {
//         setError(err.message)
//             setIsLoading(false)
//     })
//     }, deps ? deps : []);
//     return{data, error, isLoading};


return useQuery({
    queryKey: queryKey,
    queryFn:   fetchFunction,
    staleTime: staleTime
})





}

export default useData
