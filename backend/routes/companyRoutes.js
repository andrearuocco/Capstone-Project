import express from 'express'
import { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany, getProfilesByCompany } from '../controllers/company.controller.js'

const companyRouter = express.Router()

companyRouter.post('/companies', createCompany)           
companyRouter.get('/companies', getAllCompanies)          
companyRouter.get('/companies/:id', getCompanyById)       
companyRouter.put('/companies/:id', updateCompany)        
companyRouter.delete('/companies/:id', deleteCompany)       

companyRouter.get('/companies/:companyId/profile', getProfilesByCompany)

// patch per il logo aziendale TODO

export default companyRouter