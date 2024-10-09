import ProfileOne from './ProfileOne'
import { useEffect, useState, useContext } from 'react'
import { Container, Row, Form, Button, Col, Modal } from 'react-bootstrap/'
import { fetchGetProfiles, login } from '../../data/fetch'
import { ProfileContext } from '../context/ProfileContextProvider'
import NavbarMe from '../view/NavbarMe'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import businessImage from '../view/business-concept-with-team-close-up.jpg'
import brandImage from '../view/brand.jpg'
import './ProfileList.css'
import RegisterForm from '../view/RegisterForm'
import { ThemeContext } from '../context/ThemeContextProvider'

function ProfileList() {
  const [profile, setProfile] = useState([])
  const [showForm, setShowForm] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const [formValue, setFormValue] = useState({ email: "", password: "" })
  const { token, setToken, userInfo, setUserInfo } = useContext(ProfileContext)
  const handleClose = () => setShowForm(false)
  const handleShow = () => setShowForm(true)
  const {theme} = useContext (ThemeContext)
  const showRegisterForm = () => {
    setShowForm(!showForm)
  }
  useEffect(() => {
    console.log(searchParams.get('token'))
    if (searchParams.get('token')) {
      localStorage.setItem('token', searchParams.get('token'))
      setToken(searchParams.get('token'))// aggiorna il token nello stato del contesto
    }
    fetchGetProfiles().then(data => {
      const filteredProfiles = data.filter(p => p._id !== userInfo?._id);
      setProfile(filteredProfiles)
    })
  }, [userInfo])

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

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }

  console.log(profile)
  return (
    <>
      <div className='bg-gradient bg-opacity-25 bg-success-subtle'>
        {!token && (
          <Container fluid>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 1 }}
              className='br-40'
              style={{
                backgroundImage: `url(${brandImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <div className='d-flex flex-column text-black-50 mt-5'>
                <h1 className='mt-5'>Manage your business with our help</h1>
                <p>Manage your business operations with ease</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 2 }}
              style={{ paddingTop: '2rem' }}
            >
              <Container id='container-login'>
                <Row className="justify-content-center align-items-center">
                  
                  <Col md={6}>
                    <Form onSubmit={handleLogin} className="login-form">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <motion.div
                          className="input-border"
                          initial={{ borderColor: 'transparent' }}
                          whileFocus={{ borderColor: '#007bff' }}
                          transition={{ duration: 0.5 }}
                        >
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            required
                          />
                        </motion.div>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <motion.div
                          className="input-border"
                          initial={{ borderColor: 'transparent' }}
                          whileFocus={{ borderColor: '#007bff' }}
                          transition={{ duration: 0.5 }}
                        >
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                          />
                        </motion.div>
                      </Form.Group>

                      <div className="row">
                        <Button type='submit' className="my-2 col-sm-6 col-md-4 login" variant="primary">
                          Accesso con credenziali
                        </Button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="my-2 btn btn-link col-sm-6 col-md-4"
                          onClick={handleShow}
                        >
                          Don't have an account? Register here!
                        </motion.button>

                        <Button as={Link} to={'http://localhost:5000/api/v1/auth/login-google'} className="google my-2 col-sm-6 col-md-4 bg-white">
                          <span className='text-primary'>Google For Employee</span>
                        </Button>
                      </div>
                    </Form>
                  </Col>

                  <Col md={6} className="d-flex justify-content-center">
                    <img src={businessImage} alt="Your business" style={{ width: '100%', height: '40vh' }} className='br-40' />
                  </Col>
                </Row>
              </Container>
            </motion.div>
            <footer className='sticky-bottom footer br-40'>
              <strong className='footer-text'>Nuove soluzioni per la gestione e l'amministrazione della tua impresa.</strong>
            </footer>
          </Container>

        )}
        <Modal show={showForm} onHide={handleClose}>
          <Modal.Header closeButton>
            
          </Modal.Header>
          <Modal.Body>
            <RegisterForm showForm={showForm} setShowForm={setShowForm} />
          </Modal.Body>
        </Modal>
      </div>

      {token && (
        <div className={theme === 'light' ? 'bg-gradient bg-opacity-25 bg-success-subtle v-100' : 'v-100'}>

          <NavbarMe></NavbarMe>

          <Container>
            <Row className='my-4'>
              {profile.map((p) => (
                <ProfileOne key={p._id} profile={p} />
              ))}
            </Row>
          </Container>
        </div>
      )} 
      <footer className='sticky-bottom footer br-40'>
        <strong className='footer-text'>Nuove soluzioni per la gestione e l'amministrazione della tua impresa.</strong>
      </footer>
    </>
  );
}

export default ProfileList