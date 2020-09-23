import jwt from 'jsonwebtoken';
import config from './config.js';

// define const getToken and define user as a parameter, inside jwt.sign..first one is a payload and second one is to encrpt payload and last parameter is expires in
const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,

    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
  }

  export{
      getToken
  }
  