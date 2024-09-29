import { ProfileContext } from "../context/ProfileContextProvider"
import { useContext, useState, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate, useSearchParams } from "react-router-dom"
import { login } from "../../data/fetch"

function LoginForm({ showForm, setShowForm }) {
/*   const { login } = useContext(ProfileContext)
  const navigate = useNavigate()

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  }) // gestisco lo stato di login inizializzando quello iniziale a un oggetto con chiavi dai valori vuoti 

  const handleFormChange = (event) => {
    const target = event.target
    setLoginFormData({ ...loginFormData, [target.name]: target.value }) // cattura i valori dell'evento di trasformazione dei campi vuoti in seguito all'inserimento dati dell'utente
  }
  
  // funzione per gestire il login al submit
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      
      await login(loginFormData.email, loginFormData.password) // alla funzione di login chiamata dal context vengono passati come paramentri necessari i valori di email e password 
      navigate('/') // se il login è riuscito vai alla pagina PERSONALIZZATA
    } catch (error) {
      alert(`Login non riuscito, controlla le tue credenziali. ${error}`)
    }
  }

  // funzione per mostrare il form di registrazione
  const showRegisterForm = () => {
    setShowForm(!showForm)
  } */
  
    let [searchParams, setSearchParams]=useSearchParams()
    const [formValue, setFormValue] = useState({email:"", password:""})
    const showRegisterForm = () => {
      setShowForm(!showForm)
    } 
    useEffect(()=>{
      console.log(searchParams.get('token'))
      if(searchParams.get('token')){
        localStorage.setItem('token',searchParams.get('token'))
        setToken(searchParams.get('token'))// aggiorna il token nello stato del contesto
      }
    },[])
    const {token, setToken, userInfo, setUserInfo} = useContext(ProfileContext)

    const handleLogin = async () => {
        try {
          const tokenObj = await login(formValue) //così abbiamo il token da mettere nel localstorage
          if(tokenObj && tokenObj.token){ // ctrollo se tokenObj e token sono definiti
          localStorage.setItem('token', tokenObj.token) //ls setitem accetta 2 parametri: la chiave con cui vuoi salvare e poi il valore
          setToken(tokenObj.token) //dentro token obj c'è la risposta completa dell'end point che è un oggetto e noi dobbiamo prendere solo la propiretà token
     
          alert('Login effettuato')
          }else {
          alert("Credenziali errate")
          }
        } catch (error) {
          console.log(error)
          alert(error + 'Errore, riporva più tardi')
        }
      }

      const handleChange = (event) =>{
        setFormValue({
          ...formValue, 
          [event.target.name] : event.target.value
        })
      }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="link" onClick={showRegisterForm} className="registerButton">
          Don't have an account? Register here!
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;