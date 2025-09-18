const jwt = require("jsonwebtoken");

async function checkAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const token = authHeader.split(" ")[1];
    const data = jwt.verify(token, process.env.SECRET_KEY);

    // Attach user data to request
    req.user = { id: data.id, email: data.email };

    next(); // Move to the next middleware or route
  } catch (error) {
    console.log(error);
    console.log("error in getting from checkAuth middleWare");
    return res.status(401).json({ message: "Not Authorized to make any request!!" });
  }
}

module.exports = checkAuth;
