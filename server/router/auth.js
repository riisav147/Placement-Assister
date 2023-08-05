const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('../db/conn');
const User = require('../model/userSchema');
const placementData = require('../model/studentData');
const authenticate = require('../middleware/authenticate');
const { route } = require('../routes');


router.get('/', (req, res) => {
    res.send(`Hello world from server router js`);
});


router.use(cookieParser());


// using promises
// router.post('/register',(req,res)=>{

//     const{name,email,password,cpassword}= req.body;

//     if(!name || !email || !password || !cpassword){
//         return res.status(422).json({error:"plz filled the field properly"});
//     }

//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({ error: " Email already exist"})
//         }

//         const user = new User({name,email,password,cpassword})

//         user.save().then(()=>{
//             res.status(201).json({ message: "user registered successfuly"});
//         }).catch((err)=>res.status(500).json({error:"Failed to register"}))
//     }).catch(err=>{console.log(err);});
// })





// using async and awaits

router.post('/register', async (req, res) => {

    const { name, rollNo, email, password, cpassword } = req.body;

    if (!name || !rollNo || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill out all fields properly" });
    }

    try {

        const userExist = await User.findOne({ email: email });
        if (userExist) {
            // Return a 422 error if user already exists
            return res.status(422).json({ error: "Email already exists" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "pssswords are not matching" });
        } else {

            const user = new User({ name, rollNo, email, password, cpassword })

            const userRegister = await user.save();

            if (userRegister) {
                res.status(201).json({ message: "User registered successfully" });
            } else {
                res.status(500).json({ error: "Failed to register" });
            }

        }



    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to register" });
    }
})


const SECRET_KEY = process.env.SECRET_KEY;

//login route

router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({ message:"awesome"});

    try {
        const { email, rollNo, password } = req.body;

        if (!email || !rollNo || !password) {
            return res.status(400).json({ error: "please fill the data" })
        }

        const userLogin = await User.findOne({ email: email });

        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            // const token = jwt.sign({ userId: User._id }, SECRET_KEY, { expiresIn: '1h' });
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true

            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credential" });
            } else {
                res.json({ message: "user Signin Successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid credential" });
        }

    } catch (err) {
        console.log(err);
    }
})



//studentData Route
router.post('/studentForm', async (req, res) => {
    try {


        const { name, phone, email, officialEmail, address1, address2,
            state, postcode, course, semester, gender, dob, schoolName,
            ten_board, ten_yOfpassing, ten_percentage, ten_state, ten_country,
            schoolName1, twl_board, twl_yOfpassing, twl_percentage, twl_state,
            twl_country
        } = req.body;
        if (!name || !phone || !email || !officialEmail || !address1 || !address2 || !state || !postcode || !course || !semester || !dob || !schoolName || !ten_board || !ten_yOfpassing || !ten_percentage || !ten_state || !ten_country || !schoolName1 || !twl_board || !twl_yOfpassing || !twl_percentage || !twl_state || !twl_country) {
            return res.status(400).json({ error: "please fill the data" })
        } else {

            const student = new placementData({
                name, phone, email, officialEmail, address1, address2,
                state, postcode, course, semester, dob, schoolName,
                ten_board, ten_yOfpassing, ten_percentage, ten_state, ten_country,
                schoolName1, twl_board, twl_yOfpassing, twl_percentage, twl_state,
                twl_country
            })
            const formData = await student.save();

            if (formData) {
                res.status(201).json({ message: "Data uploaded successfully" });
            } else {
                res.status(500).json({ error: "Failed to upload " });
            }
        }

    } catch (e) {
        console.log(err);
    }
});


// student module home

router.get('/StudentLogin/components/studentModule/studentNavbar', authenticate, (req, res) => {
    console.log(`hello my About`);
    res.send(req.rootUser);
})
router.get('/StudentLogin/components/studentModule/studentNavbar/studentProfile', authenticate, (req, res) => {
    res.send(req.rootUser);
})
router.get('/StudentLogin/components/studentModule/studentNavbar/studentForm', authenticate, (req, res) => {
    res.send(req.rootUser);
})
// router.get('/studentForm', authenticate, (req, res) => {
//     res.send(req.rootUser);
// })
router.get('/studentNavbar', authenticate, (req, res) => {
    console.log(`hello my About`);
    res.send(`Hello world from about`);
})
router.get('/studentProfile', authenticate, (req, res) => {
    console.log(`hello my About`);
    res.send(`Hello world from about`);
})


router.get('/placementdata', async (req, res) => {
    try {
        // Extract the user ID from the JWT token
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const userId = decodedToken.userId;

        // Fetch the user's placement data from the PlacementData collection
        const PlacementData = await placementData.find({ userId });

        res.json(PlacementData);
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
});






module.exports = router;
