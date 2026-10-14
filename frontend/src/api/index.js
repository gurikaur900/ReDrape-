import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('redrape_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const loginUser = (data) => API.post('/auth/login', data)
export const registerUser = (data) => API.post('/auth/register', data)
export const getMe = () => API.get('/auth/me')

// Outfits
export const getOutfits = (params) => API.get('/outfits', { params })
export const getOutfitById = (id) => API.get(`/outfits/${id}`)
export const createOutfit = (data) => API.post('/outfits', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
})
export const updateOutfit = (id, data) => API.put(`/outfits/${id}`, data)
export const deleteOutfit = (id) => API.delete(`/outfits/${id}`)

// Bookings
export const createBooking = (data) => API.post('/bookings', data)
export const getMyBookings = () => API.get('/bookings/my')
export const getBookingById = (id) => API.get(`/bookings/${id}`)
export const cancelBooking = (id) => API.put(`/bookings/${id}/cancel`)

// Wishlist
export const getWishlist = () => API.get('/wishlist')
export const addToWishlist = (outfitId) => API.post('/wishlist', { outfitId })
export const removeFromWishlist = (outfitId) => API.delete(`/wishlist/${outfitId}`)

// Wardrobe (lender listings)
export const getMyWardrobe = () => API.get('/wardrobe')
export const getWardrobeStats = () => API.get('/wardrobe/stats')

// Admin
export const adminGetUsers = () => API.get('/admin/users')
export const adminGetOutfits = () => API.get('/admin/outfits')
export const adminGetBookings = () => API.get('/admin/bookings')
export const adminGetStats = () => API.get('/admin/stats')
export const adminUpdateUser = (id, data) => API.put(`/admin/users/${id}`, data)
export const adminDeleteOutfit = (id) => API.delete(`/admin/outfits/${id}`)

export default API
