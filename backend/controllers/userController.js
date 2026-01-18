const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:"30d"})
}

// get post delete update/patch

// @desc    Get All Users from DB
// @route   /users
// @access  Private
const getUsers = async (req,res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.json({
            message: error.message
        })
    }  
}

// @desc    Creates a user
// @route   /register
// @access  Public
const registerUser = async (req, res) => {
    const { name,age,phone, email, password } = req.body;
    try {
        // Check if user already exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Nalog već postoji" });
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        // Create new user
        const user = await User.create({ name, email, password:hash, age, phone });
        if (!user) {
            res.status(500).json({ message: "Greška pri kreiranju korisnika" });
        }
        const token = generateToken(user._id);
        // Return successful response
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
            age: user.age,
            phone: user.phone,
            applications:user.applications,
            courses: user.courses,
            createdAt: user.createdAt,
            updatedAt:user.updatedAt,   
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error });
    }
};

// @desc    Logins a user
// @route   /login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({message:"Uneti email nije registrovan"})
        }
        if(user && (await bcrypt.compare(password,user.password))){
            res.status(200).json({
                _id: user._id,
                email: user.email,
                token: generateToken(user._id),
                name: user.name,
                age: user.age,
                phone: user.phone,
                courses: user.courses,
                createdAt: user.createdAt,
                updatedAt:user.updatedAt,   
            })
        } else res.status(400).json({message:"Pogrešan email ili lozinka"})
    } catch (error) {
        res.status(500).json({message:error})
    }
}

// @desc    Removes a user
// @route   /remove/:id
// @access  Private
const removeUser = async (req, res) => {
    try {
          // Trazimo u bazi korisnika sa tim ID-jem
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            message: 'Invalid user ID format.',
        });
    }

    const user = await User.findById(id);
    //   Ako ne postoji, vracamo 404 Not Found
    if (!user) {
        res.status(404);
        res.json({
            message: 'User with the given ID was not found.',
        });
        return;
  }
    //   Ako postoji, brisemo i vracamo taj objekat koji smo obrisali
         await User.deleteOne({ _id: id });
        res.json(user);
    } catch (error) {
        res.json({error:error.message})
    }

};


module.exports={getUsers,registerUser,loginUser,removeUser}