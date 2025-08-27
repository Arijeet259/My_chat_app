import { createVerifier } from "fast-jwt";
import { JWT_SECRET } from "../config.js";

const verify = createVerifier({
  key: JWT_SECRET,
  algorithms: ["HS256"],
  cache: true,
});

async function protectedRoute(req, res) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.code(401).send({ message: "Unauthorized user" });
    }

    const decoded = verify(token); 
    
    req.user = decoded;
  } catch (err) {
    console.log("pre handler - error", err);
    return res.code(401).send({ message: "Unauthorized failed user error" });
  }
}

export { protectedRoute };
