import express from 'express'
import {getClients, createClient, updateClient, deleteClient, getClientsByUser} from '../controllers/clients.js'

const router = express.Router()

router.get('/', getClients)
router.get('/user', getClientsByUser);
router.post('/', createClient)
router.patch('/:id', updateClient)
router.delete('/:id', deleteClient)

export default router