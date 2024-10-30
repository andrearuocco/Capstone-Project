import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import profileRoutes from './routes/profileRoutes.js'
import authRouter from './routes/authRoutes.js'
import GoogleStrategy from './config/passport.js' 
import passport from 'passport'
import employeeRouter from './routes/employeeRoutes.js'
import payEnvelopeRouter from './routes/payenvelopeRoutes.js'
import dailytaskRouter from './routes/dailytaskRoutes.js'
import companyRouter from './routes/companyRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import requestsRouter from './routes/requestRoutes.js'

const port = process.env.PORT || 5000
const host = process.env.HOST || 'http://localhost'
const server = express()

passport.use('google', GoogleStrategy) // a differenza di quelli seguenti non è un middleware ma consente di indicare la strategia da usare 

server.use(express.json()) // express è un middleware utilizzato in modo che il server riconosca come JSON il body delle richieste
server.use(cors()) // cors è un middleware che consente la connessione tra il server di backend e quello di frontend
server.use(morgan("dev")) // middleware che mostra i log delle richieste http
server.use(helmet()) // modulo che aiuta a proteggere le applicazioni

server.use('/api/v1/auth', authRouter)
server.use('/', companyRouter)
server.use('/', profileRoutes)
server.use('/', adminRouter)
server.use('/', employeeRouter)


server.use('/api/v1', payEnvelopeRouter)
server.use('/profile', dailytaskRouter)
server.use('/profile', requestsRouter)


await mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connessione al database...'))
    .catch((err) => console.log(err))

server.listen(port, () => {
    console.log(`Capstone's server is listening on ${host}:${port}`)
})