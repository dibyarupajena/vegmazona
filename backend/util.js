import jwt from 'jsonwebtoken';
import config from './config';

// define const getToken and define user as a parameter, inside jwt.sign..first one is a payload and second one is to encrpt payload and last parameter is expires in
const getToken = (user) => {
    return jwt.sign(user, config.JWT_SECRET, {
        expiresIn: '48h'
    });
  };

  export{
      getToken
  }
  