const User = require("../models/user");
const Elections = require("../models/elections");
const Contestant = require("../models/contestants");


exports.addContestants = async(req,res) => {
    try{
        const {name,photo,category,title,email} = req.body;

        const user = await User.findOne({email});

        if(!user || user.role !== "ADMIN"){
            return res.status(401).json({
                success : false,
                message : "Admin only have access to create the election."
            })
        }

        if(!name || !photo || !title){
            return res.status(404).json({
                success : false,
                message : "Required all fields"
            })
        }

        const election = await Elections.findOneAndUpdate({title: title,category : category},{
            $push : {
                contestants : {
                    name : name,
                    photo: photo,
                }
            }
        },{new : true})

        return res.status(200).json({
            success : true,
            message : "Successfully added the contestants in the election.",
            data : election,
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

exports.getContestants = async (req, res) => {
    try {
      const { electionId } = req.body;
      const contestants = await Contestant.find({ election: electionId });
      return res.status(200).json({ success: true, data: contestants,message : "Successfuly fetched contestants" });
    } catch (error) {
      return res.status(500).json(
        {success: false,
        message: "Failed to fetch contestants."
      });
    }
  };