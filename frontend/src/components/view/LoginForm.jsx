import { MeContext } from "../context/MeContext";
import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm({ showForm, setShowForm }) {
  const { login } = useContext(MeContext)
  const navigate = useNavigate()

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  }) // gestisco lo stato di login inizializzando quello iniziale a un oggetto con chiavi dai valori vuoti 

  const handleFormChange = (event) => {
    const target = event.target
    setLoginFormData({ ...loginFormData, [target.name]: target.value }) // cattura i valori dell'evento di trasformazione dei campi vuoti in seguito all'inserimento dati dell'utente
  }

  // Funzione per gestire il login al submit
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      
      await login(loginFormData.email, loginFormData.password) // alla funzione di login chiamata dal context vengono passati come paramentri necessari i valori di email e password 

      navigate('/') // se il login è riuscito vai alla pagina personalizzata (edit / in the future _ 28/09)
    } catch (error) {

      alert(`Login non riuscito, controlla le tue credenziali. ${error}`)
    }
  }

  // funzione per mostrare il form di registrazione
  const showRegisterForm = () => {
    setShowForm(!showForm)
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={loginFormData.email}
          onChange={handleFormChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={loginFormData.password}
          onChange={handleFormChange}
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
