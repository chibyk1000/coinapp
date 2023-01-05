import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { setLogin, setIsLoading } from '../redux/authSlice'
import { setUser } from '../redux/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { BASE_URL } from "@env";
export default function Layout({children}) {
    const dispatch = useDispatch()
    const {login} =  useSelector((state)=> state.authSlice)
    const { user } = useSelector((state) => state.userSlice)
    
const getUser = async () => {
    try {
        const resp = await axios.get(`${BASE_URL}/auth/api/user`) 
        if (resp) {
            dispatch(setUser(resp.data))
            dispatch(setLogin(true))
            dispatch(setIsLoading(false))
        }
   
    } catch (err) {
        console.log(err)
    }
}
    useEffect(() => {
getUser()
    }, [login])
    
    
  return (
    <>
{children}
    </>
  )
}