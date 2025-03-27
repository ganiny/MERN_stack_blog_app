const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
       const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
       // create new property in req object
       req.user = decodedPayload; 
       next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Access Denied, Invalid Token!"})
    }
  } else {
    return res.status(401).json({message: "Access Denied, No Token Provided!"})
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({message: "Not allowed!, you are not admin nor account owner"})
    }
  });
  
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({message: "Not allowed!, admin only"})
    }
  });
};

const verifyTokenAndUserOnly = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json({message: "Not allowed!, account owner only"})
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyTokenAndUserOnly,
}


