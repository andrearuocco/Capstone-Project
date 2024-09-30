import ProfileOne from './ProfileOne'
import { useEffect, useState, useContext } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap/'
import { fetchGetProfiles, login } from '../../data/fetch'
import { ProfileContext, ProfileContextProvider } from '../context/ProfileContextProvider'
import NavbarMe from '../view/NavbarMe'
import { useSearchParams } from 'react-router-dom'

function ProfileList() {
    const [profile, setProfile] = useState([])
    const [showForm, setShowForm] = useState(true)
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
      fetchGetProfiles().then(data => setProfile(data))
    },[])
    const {token, setToken, userInfo, setUserInfo} = useContext(ProfileContext)

    const handleLogin = async (event) => {
        event.preventDefault(); // Previene il comportamento predefinito del form (che ricarica la pagina)
        try {
          const tokenObj = await login(formValue); // Otteniamo il token dalla chiamata di login
          if (tokenObj && tokenObj.token) { // Controlliamo se il token esiste
            localStorage.setItem('token', tokenObj.token); // Salviamo il token nel localStorage
            setToken(tokenObj.token); // Aggiorniamo il token nello stato del contesto
      
            alert('Login effettuato');
          } else {
            alert("Credenziali errate");
          }
        } catch (error) {
          console.log(error);
          alert('Errore, riprova più tardi: ' + error);
        }
      };
      

      const handleChange = (event) =>{
        setFormValue({
          ...formValue, 
          [event.target.name] : event.target.value
        })
      }


    console.log(profile)
    return (<>
    {!token &&<Form onSubmit={handleLogin}>
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
    </Form>}
    {token && <><NavbarMe></NavbarMe>
    <Container><Row>
            {profile.map(p =>  <ProfileOne key={p._id} profile={p} /> )}
        </Row></Container></>}    </>
    )
}

export default ProfileList