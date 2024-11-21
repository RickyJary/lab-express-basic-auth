const { 
  signUp, 
  doSignUp 

} = require("../controllers/auth.controller");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/signup', signUp)
router.post('/signup', doSignUp)

module.exports = router;