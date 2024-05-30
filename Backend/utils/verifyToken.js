import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(400).json({message: "Token Expired! Login Again!"});

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(400).json({message: "Internal Server Error"});

    req.user = user;
    next();
  });
};