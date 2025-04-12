const user = require('../models/user');

exports.signup = async(req,res) => {
    try{
        const {email,password,role} = req.body;

        const existingUser = await user.find({email});

        if(!existingUser){
            return res.status(401).json({
                success : false,
                message : "User Already Exists."
            })
        }

        if(!email || !password || !role){
            return res.status(404).json({
                success : false,
                message : "Data not found,required all fields."
            })
        }

        const User = await user.create({email : email,password : password,role : role});

        if(!User){
            return res.status(401).json({
                success : false,
                message : "User not created."
            })
        };

        return res.status(200).json({
            success : true,
            data : User,
            message : "Successfully User Created."
        });

    }
    catch(e){
        console.log(e);
        console.error(e);
        return res.status(500).json({
            success : false,
            message : "Something went wrong,try again!",
        })
    }
};

exports.login = async(req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).json({
                success : false,
                message : "Required all fields",
            })
        };

        const loginUser = await user.findOne({email});

        if(!loginUser){
            return res.status(404).json({
                success : false,
                message : "Account not found,Please Sign up"
            })
        };

        if(password !== loginUser.password){
            return res.status(402).json({
                success : false,
                message : "Password Doesnot match.try again."
            })
        }

        return res.status(200).json({
            success : true,
            message : "Successfully Logined in.",
            data : loginUser,
        })

    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success : false,
            message : "Something went wrong."
        })
    }
}

exports.getUserByEmail = async(req,res) => {
    try{
        const {email} = req.params;
        const Users = await user.findOne({email : email});
        if(!Users){
            return res.status(404).json({
                success : false,
                message : "Data not found."
            })
        }
        console.log(Users);

        return res.status(200).json({
            success : true,
            data : Users,
            message : "Successfully retrived User data."
        })
    }
    catch(e){
        console.log(e);
        console.error(e);
        return res.status(500).json({
            success : false,
            message : "Something went wrong."
        })
    }
};

