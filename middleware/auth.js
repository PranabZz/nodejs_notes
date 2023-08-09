const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Import the cookie-parser package

function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    const cookieToken = req.cookies['jwt'];

    if (!cookieToken) {
      return res.sendStatus(401);
    }

    jwt.verify(cookieToken, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  }
}

module.exports = auth;
