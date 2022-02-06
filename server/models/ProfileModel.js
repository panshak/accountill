import mongoose from 'mongoose'

const profileSchema = mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    phoneNumber: String,
    businessName: String,
    contactAddress: String,
    paymentDetails: String, 
    logo: String,
    website: String,
    userId: [String],
})

const Profile = mongoose.model('Profile', profileSchema)

export default Profile