import ProfileOne from './ProfileOne'
import { useEffect, useState, useContext } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap/'
import { fetchGetProfiles, login } from '../../data/fetch'
import { ProfileContext } from '../context/ProfileContextProvider'
import NavbarMe from '../view/NavbarMe'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import businessImage from '../view/business-concept-with-team-close-up.jpg'
import brandImage from '../view/brand.jpg'

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
        event.preventDefault(); // previene il comportamento predefinito del form (che ricarica la pagina)
        try {
          const tokenObj = await login(formValue); // otteniamo il token dalla chiamata di login
          if (tokenObj && tokenObj.token) { // controlliamo se il token esiste
            localStorage.setItem('token', tokenObj.token); // salviamo il token nel localStorage
            setToken(tokenObj.token); // aggiorniamo il token nello stato del contesto
      
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
  return (
    <>
      {!token && (
        <Container fluid>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            style={{
              backgroundImage: `url(${brandImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <div className='d-flex flex-column text-black-50'><h1>Manage your business with our help</h1>
            <p>Manage your business operations with ease</p></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ paddingTop: '2rem' }}
          >
            <Container>
              <Row className="justify-content-center">
                <Form onSubmit={handleLogin} className="col-md-6">
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

                  <div className="d-flex justify-content-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mx-2 btn btn-primary"
                      type="submit"
                    >
                      Submit
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mx-2 btn btn-outline-primary"
                      as="a"
                      href="http://localhost:5000/api/v1/auth/login-google"
                    >
                      Google For Employee
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mx-2 btn btn-link"
                      onClick={showRegisterForm}
                    >
                      Don't have an account? Register here!
                    </motion.button>
                  </div>
                </Form>
              </Row>
            </Container>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="d-flex justify-content-center mt-5"
          >
            <img
              src={businessImage}
              alt="Your business"
              style={{ width: '300px' }}
            />
          </motion.div>
        </Container>
      )}

      {token && (
        <>

          <NavbarMe></NavbarMe>

          <Container>
            <Row>
              {profile.map((p) => (
                <ProfileOne key={p._id} profile={p} />
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default ProfileList