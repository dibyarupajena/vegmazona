import express from 'express';
import User from '../models/userModel.js';


const router = express.Router();

// 2. route to signin 

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),                // this token is an identifier and I can identify the next request is authenticated or not
    });
  } else {
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
});

// 1. first router to define is to create an admin user, '/createadmin' because it auto concates '/api/users'(server.js) with this part to create a path

router.get("/createadmin/", async (req, res) => {
    try {
      const user = new User({
        name: 'Dibyarupa',
        email: 'dibyathecool.jena@gmail.com',
        password: '1234',
        isAdmin: true,
      });

      // created a new user, time to save it in ..
      const newUser = await user.save();
      res.send(newUser);
    } catch (error) {                                       // try, catch bc if there is an error, need to send error to the server
      res.send({ msg: error.message });
    }
  });

export default router;