

const {userModel}=require("../models/userSchema.js")
const jwt=require("jsonwebtoken")
const path=require("path")
require("dotenv").config();

async function userSignup(req, res) {
    const { Name, RollNo, Role, Password, ID_Scan_Code, Email } = req.body;

    try {
        if (!Name || !RollNo || !Role || !Password || !ID_Scan_Code || !Email) {
            return res.status(400).send("All fields are required");
        }
        const updated = await userModel.create({ Name, RollNo, Role, Password, ID_Scan_Code, Email });
        if (updated) {
            const token=jwt.sign({RollNo},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
            res.clearCookie('isLoggedin');
            res.cookie('isLoggedin',token,{maxAge:360000,httpOnly:true,secure:true});
            res.status(201).send("User has been created successfully");
        } else {
            res.status(500).send("User creation failed");
        }
    } catch (error) {
        console.error(error); 
        res.status(500).send("An error occurred while creating the user");
    }
}

async function userLogin(req, res) {
    const  RollNo = req.body.RollNo;
    const  Password = req.body.Password;

    try {
        // Find the user by RollNo and Password
        const user = await userModel.findOne({ RollNo ,Password});

        console.log(user);
        if (user ) { 
            const key = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ RollNo }, key, { expiresIn: '1h' }); 

            if (token) {
                res.cookie('isLoggedin', token, {
                    maxAge: 3600000, // 1 hour
                    httpOnly: true,
                    secure: true, 
                });
                return res.send("User has been logged in successfully");
            } else {
                return res.status(500).send("Token has not been formed");
            }
        } else {
            return res.status(401).send("Invalid RollNo or Password");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("An error occurred during login");
    }
}
async function isProtected(req, res, next) {
    const token = req.cookies.isLoggedin;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded; // Attach decoded user info to the request
            next(); // Proceed to the next middleware/route
        });
    } else {
        // Send the error.html file when there is no token
        res.status(401).sendFile(path.join(__dirname, '../public', 'error.html')); // Adjust the path as necessary
    }
}
module.exports={userSignup,userLogin,isProtected};