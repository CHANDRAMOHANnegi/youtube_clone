const jwt = require('jsonwebtoken');
const User = require('../database/models').User;

module.exports = (req, res, next) => {
  // console.log("=======>", req);
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }
  console.log("=======>", authorization);

  const token = authorization.split(' ')[1];
  if (!token)
    return res.status(401).send({
      success: false,
      payload: {
        message: "Token Not Provided. Hence, Unauthorized"
      }
    });

  // User.findOne({ where: { token } }).then((res) => {
  //   let user = JSON.parse(JSON.stringify(res));
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secretKey');
    if (!decodedToken) {
      req.isAuth = false;
      return next();
    };
    req.isAuth = true;
    req.user = decodedToken;
    next();
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  // }).catch((err) => {
  //   console.log(err);
  //   next()
  // });

}

