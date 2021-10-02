import axios from 'axios'

// const API = axios.create({ baseURL: 'http://localhost:5000'})
const API = axios.create({ baseURL: process.env.REACT_APP_API})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

// export const fetchInvoices =() => API.get('/invoices')
export const fetchInvoice =(id) => API.get(`/invoices/${id}`)
export const addInvoice =( invoice ) => API.post('/invoices', invoice)
export const updateInvoice = (id, updatedInvoice) => API.patch(`/invoices/${id}`, updatedInvoice)
export const deleteInvoice =(id) => API.delete(`/invoices/${id}`)
export const fetchInvoicesByUser = (searchQuery) => API.get(`/invoices?searchQuery=${searchQuery.search}`);

export const fetchClient = (id) => API.get(`/clients/${id}`);
export const fetchClients = (page) => API.get(`/clients?page=${page}`);
export const addClient =( client ) => API.post('/clients', client)
export const updateClient = (id, updatedClient) => API.patch(`/clients/${id}`, updatedClient)
export const deleteClient =(id) => API.delete(`/clients/${id}`)
export const fetchClientsByUser = (searchQuery) => API.get(`/clients/user?searchQuery=${searchQuery.search}`);


export const signIn =(formData)=> API.post('/users/signin', formData)
export const signUp =(formData)=> API.post('/users/signup', formData)
export const forgot = (formData) => API.post('/users/forgot', formData);
export const reset = (formData) => API.post('/users/reset', formData);

export const fetchProfilesBySearch = (searchQuery) => API.get(`/profiles/search?searchQuery=${searchQuery.search || searchQuery.year || 'none'}`);
export const fetchProfile = (id) => API.get(`/profiles/${id}`)
export const fetchProfiles = () => API.get('/profiles');
export const fetchProfilesByUser = (searchQuery) => API.get(`/profiles?searchQuery=${searchQuery.search}`)
export const createProfile = (newProfile) => API.post('/profiles', newProfile);
export const updateProfile = (id, updatedProfile) => API.patch(`/profiles/${id}`, updatedProfile);
export const deleteProfile = (id) => API.delete(`/profiles/${id}`);