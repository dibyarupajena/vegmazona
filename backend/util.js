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

//Implementing authentication
  const isAuth = (req, res, next) => {
    const token = req.headers.authorization;                                 //get the token
  
    if (token) {                                                            //if token exists
      const onlyToken = token.slice(7, token.length);
      jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).send({ message: 'Invalid Token' });
        }
        req.user = decode;
        next();
        return;
      });
    } else {                                                                    // if token doesnt exist
      return res.status(401).send({ message: 'Token is not supplied.' });
    }
  };

  const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.status(401).send({ message: 'Admin Token is not valid.' });
  };

  export{
      getToken, isAuth, isAdmin
  }
  