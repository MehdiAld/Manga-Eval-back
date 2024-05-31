import jwt from "jsonwebtoken";
import "dotenv/config";

//  export const authMiddleware = (req, res, next) => {
//    const token = req.headers.authorization;
//    if (!token) {
//      return res.status(401).json({ message: "NON-authorized - token manquant" });
//    }
//    const tokenParts = token.split(" ");
//    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
//      return res.status(401).json({ message: "NON-authorized - token invalide" });
//    }
//    const jwtToken = tokenParts[1];
//    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
//      if (err) {
//        return res
//          .status(401)
//          .json({ message: "NON-authorized - token invalide" });
//      }
//      next();
//    });
//  };


export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Non autorisé - jeton manquant" });
  }
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Non autorisé - jeton invalide" });
  }
  const jwtToken = tokenParts[1];
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Non autorisé - jeton invalide" });
    }
    req.user = decoded;

    console.log("Informations du token décodées :", decoded);

    next();
  });
};
