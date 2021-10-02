import express from 'express'
import { getInvoices, createInvoice, updateInvoice, deleteInvoice, getInvoice, getInvoicesByUser } from '../controllers/invoices.js'

const router = express.Router()

router.get('/:id', getInvoice)
// router.get('/creator', getInvoicesByUser);
router.get('/', getInvoicesByUser)
router.post('/', createInvoice)
router.patch('/:id', updateInvoice)
router.delete('/:id', deleteInvoice)


export default router