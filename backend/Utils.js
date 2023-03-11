const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      company_id: user.company_id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      designation: user.designation,
    },
    'something secret',
    {
      expiresIn: '30d',
    }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, 'something secret', (err, decode) => {
      if (err) {
        res.status(404).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(404).send({ message: 'No Token' });
  }
};

module.exports = isAuth;
module.exports = generateToken;
