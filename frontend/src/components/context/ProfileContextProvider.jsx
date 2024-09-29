/* import { createContext, useState, useEffect } from "react"

export const ProfileContext = createContext()

export const ProfileContextProvider = ({ children }) => {
  const [me, setMe] = useState(null) // chi è l'utente loggato

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        throw new Error('Credenziali non corrette per autenticazione');
      };

      const data = await res.json()
      console.log(data)
      if (res.ok) {
        localStorage.setItem("token", data.token)
        setMe(data.user)
      }
    } catch (error) {
      console.error("Login non riuscito", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token") // rimuovo il token dal localStorage
    setMe(null)
  };

  const getUser = async () => {
    const token = localStorage.getItem("token") // prendo il token dal localStorage
    console.log(token)
    if (token) {
      try {
        const res = await fetch("http://localhost:5000/api/v1/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json()
        console.log(data)
        if (res.ok) {
          setMe(data)
        } else {
          logout()
        }
      } catch (error) {
        console.error("I tuoi dati utenza non sono disponibili", error);
        logout()
      }
    } else {
      setMe(null)
    }
  };

  useEffect(() => {
    getUser()
  }, [])

  return (
    <ProfileContext.Provider
      value={{ me, login, logout }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
 */

import { useState, createContext, useEffect } from "react"
import { me } from "../../data/fetch"

export const ProfileContext = createContext()

export default function ProfileContextProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [userInfo, setUserInfo] = useState()
    const getMe = async () =>{
        try {
            const meInfo = await me();
            setUserInfo(meInfo)
        } catch (error) {
           if(error.message === '401'){
            localStorage.removeItem('token')
            setToken(null)
           } 
        }

    }
    useEffect(()=>{
        if (token) getMe() //la me vuole come auth il token, quindi senza il token si rompe il backend
    },[token])
    const value = {token, setToken, userInfo, setUserInfo}
    return (
        <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
    )
}