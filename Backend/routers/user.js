const express = require('express');
const router = express.Router();

const {signup,login,getUserByEmail} = require('../controllers/user');
const {castVotes,getActiveElections,createElection,disableElection,announceWinner} = require('../controllers/election');
const {addContestants,getContestants} = require("../controllers/contestants");

// Users
router.post("/signup",signup);
router.get("/getUserByEmail/:email",getUserByEmail);
router.post("/login",login);

// Elections
router.post("/createElection",createElection);
router.get("/getActiveElections",getActiveElections);
router.put("/castVotes",castVotes)
router.get("/announceWinners/:electionId",announceWinner);
router.put("/disableElections",disableElection);


// Contestants
router.post("/addContestants",addContestants);
router.get("/getContestants",getContestants);

module.exports = router;