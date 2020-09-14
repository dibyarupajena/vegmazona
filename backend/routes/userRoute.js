import express from 'express';
import User from '../models/userModel.js';



const router = express.Router();

// first router to define is to create an admin user, '/createadmin' because it auto concates '/api/users'(server.js) with this part to create a path

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
