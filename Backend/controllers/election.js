const User = require('../models/user');
const Elections = require('../models/elections');
const Contestants = require("../models/contestants");

exports.castVotes = async(req,res) => {
    try{
        const {electionId,contestantsId,email} = req.body;

        if(!electionId || !contestantsId){
            return res.status(404).json({
                success : false,
                message : "Required both the electionID and contestantsID",
            });
        }

        const election = await Elections.findOne({electionId});
        if(!election || !election.active){
            return res.status(402).json({
                success : false,
                message : "The election not found or it is inactive"
            })
        }

        if(election.voter.includes(email)){
            return res.status(402).json({
                success : false,
                message : "User already voted."
            })
        }

        const contestant = await Contestants.findOne({contestantsId});

        if(!contestant || contestant.elections.toString() !== electionId){
            return res.status(404).json({
                success : false,
                message : "Contestant not found or the electionId does not contain the contestant"
            })
        }

        contestant.votes += 1;
        await contestant.save();

        election.voter.push(email);
        await election.save();

        return res.status(200).json({
            success : true,
            message : "Successfully casted the vote"
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

exports.createElection = async(req,res) => {
    try{
        const {title,category,email} = req.body;

        const user = await User.findOne({email});

        if(!user || user.role !== "ADMIN"){
            return res.status(401).json({
                success : false,
                message : "Admin only have access to create the election."
            })
        }

        if(!title || !category){
            return res.status(404).json({
                success : false,
                message : "Required all fields."
            })
        }

        const election = await Elections.create({title : title,category : category,active : true,voter : ""});

        return res.status(200).json({
            success : true,
            message : "Election Created",
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


exports.disableElection = async(req,res) => {
    try{
        const {electionId,email} = req.body;

        const user = await User.findOne({email});

        if(!user || user.role !== "ADMIN"){
            return res.status(401).json({
                success : false,
                message : "Admin only have access to create the election."
            })
        }

        if(!electionId){
            return res.status(404).json({
                success : false,
                message : "Required a electionId."
            })
        }

        const election = await Elections.findByIdAndUpdate(electionId,{active : false},{new : true});

        return res.status(200).json({
            success : true,
            message : "Election Disabled",
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

exports.getActiveElections = async(req,res) => {
    try{
        const elections = await Elections.find({active : true});

        if(!elections){
            return res.status(404).json({
                success : false,
                message : "No election are active."
            })
        }

        return res.status(200).json({
            success : true,
            message : "Election are retrived",
            data : elections,
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

exports.announceWinner = async(req,res) => {
    try{
        const { electionId } = req.params;
        const {email} = req.body;
        const user = await User.findOne({email});

        if (!user || user.role !== "ADMIN") {
            return res.status(403).json({ success: false, message: "Only admins can announce winners." });
        }

        const contestants = await Contestants.find({ election: electionId });

        if(contestants.length === 0){
            return res.status(404).json({
                success : false,
                message : "No contestant present in the election."
            })
        }

        const maxVotes = Math.max(...contestants.map(c => c.votes));
        const winners = contestants.filter(c => (c.votes === maxVotes));

        return res.status(200).json({
            success : true,
            message : "Winners Announced",
            data : winners,
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