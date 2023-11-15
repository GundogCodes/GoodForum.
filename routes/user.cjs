const express = require("express");

const router = express.Router();
const {
  checkToken,
  dataController,
  apiController,
} = require("../controllers/user.cjs");

const ensureLoggedIn = require("../config/ensureLoggedIn.cjs");

//INDUCES
//I
//N
//D
router.get("/check-token", ensureLoggedIn, checkToken);
router.delete("/:id", dataController.deleteUser); //works
//U
router.put("/:id", dataController.updateUser, apiController.auth); //works
router.put("/addFriend/:id", dataController.addFriend); //WORKS
router.put("/removeFriend/:id", dataController.removeFriend);
//C
router.post("/new", dataController.createUser, apiController.auth); //works
router.post("/login", dataController.loginUser, apiController.auth); //works
//E
//S
router.get("/posts", dataController.getUserPosts);
router.get("/:id", dataController.getUser); //works
router.get("/", dataController.getAllUsers); //works

module.exports = router;

/*questions for daniil

Im drawn to the front end i like the designing and customizing part but i also wanna get really good at backend
My main goal with this meeting with you is to get your advice on how break into the tech field? like how can i
set myself up to get a job

I completed a bootcamp in which we learned to develop using the MERN stack.

I want to start with web developemnt but also want to get into the mobile sides of things and im gonna learn
dart/flutter for that.

What are the most used libraries or frameworks, languages people are using?
Any good projects ideas that would be good for my resume?
technical interview advice ?

review my linkedIn, portfolio, github

*/
