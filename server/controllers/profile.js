import express from 'express';
import mongoose from 'mongoose';

import ProfileModel from '../models/ProfileModel.js';

const router = express.Router();

export const getProfiles = async (req, res) => { 
  try {
      const allProfiles = await ProfileModel.find().sort({ _id: -1 });
              
      res.status(200).json(allProfiles);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const getProfile = async (req, res) => { 
  const { id } = req.params;

  try {
      const profile = await ProfileModel.findById(id);
      
      res.status(200).json(profile);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const createProfile = async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    businessName,
    contactAddress, 
    logo,
    website,
    userId,
   } = req.body;
  
  
  const newProfile = new ProfileModel({
    name,
    email,
    phoneNumber,
    businessName,
    contactAddress, 
    logo,
    website,
    userId,
    createdAt: new Date().toISOString() 
  })

  try {
    const existingUser = await ProfileModel.findOne({ email })

    if(existingUser) return res.status(404).json({ message: "Profile already exist" })
      await newProfile.save();

      res.status(201).json(newProfile );
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
}



export const getProfilesByUser = async (req, res) => {
  const { searchQuery } = req.query;

  try {
      // const email = new RegExp(searchQuery, "i");

      const profile = await ProfileModel.findOne({ userId: searchQuery });

      res.json({ data: profile });
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}



export const getProfilesBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
      const name = new RegExp(searchQuery, "i");
      const email = new RegExp(searchQuery, "i");

      const profiles = await ProfileModel.find({ $or: [ { name }, { email } ] });

      res.json({ data: profiles });
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}


export const updateProfile = async (req, res) => {
  const { id: _id } = req.params
  const profile = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No client with that id')

  const updatedProfile = await ProfileModel.findByIdAndUpdate(_id, {...profile, _id}, { new: true})

  res.json(updatedProfile)
}


  export const deleteProfile = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No profile with id: ${id}`);

    await ProfileModel.findByIdAndRemove(id);

    res.json({ message: "Profile deleted successfully." });
}



// // Function call
// ProfileModel.insertMany([
//   { name: 'Gourav', age: 20},
//   { name: 'Kartik', age: 20},
//   { name: 'Niharika', age: 20}
// ]).then(function(){
//   console.log("Data inserted")  // Success
// }).catch(function(error){
//   console.log(error)      // Failure
// });