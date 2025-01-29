const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res)=> {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone  || !password) {
        res.status(400)
        throw new Error("Please fill all fields")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400)
        throw new Error("User already exists")
    }

    //Has password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed Password:", hashedPassword)
    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
    })
    
    console.log(`User created ${user}`)
    if(user) {
        res.status(201).json({_id: user.id, email: user.email})
    } else {
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.json({message: "Register user"})
})

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res)=> {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const user = await User.findOne({ email });
    //compare password with hashedpassword
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: user.password,
                id: user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '30m',
        }
    )
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error("email or password is not valid")
    }
})


//@desc current user info
//@route POST /api/users/current
//@access private
const currentUserProfile = asyncHandler(async (req, res)=> {
    req
    res.json(req.user)
})

//@desc Update current user profile
//@route PUT /api/users/profile/:id
//@access private
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

module.exports = {registerUser, loginUser, currentUserProfile, updateCurrentUserProfile}