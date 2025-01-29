const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Get user profile
// @route GET /api/contacts/:id
// @access private

const getContact = asyncHandler(async (req, res) => {
    const contact = await User.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("User not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to see other user's contacts")
    }
    res.status(200).json(contact);
})

// @desc Update contacts
// @route PUT /api/contacts/:id
// @access private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await User.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("User not found")
    };

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }

    const updatedContact = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.status(200).json(updatedContact);
})

// @desc Delete contacts
// @route DELETE /api/contacts/:id
// @access private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await User.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("User not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete other user contacts")
    }
    await contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});


module.exports = {getContacts, createContact, getContact, updateContact, deleteContact}