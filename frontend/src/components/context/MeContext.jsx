import { createContext, useState, useEffect } from "react"

export const MeContext = createContext()

export const MeProvider = ({ children }) => {
  const [me, setMe] = useState(null) // chi è l'utente loggato

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
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
  })

  return (
    <MeContext.Provider
      value={{ me, login, logout }}
    >
      {children}
    </MeContext.Provider>
  );
}