import { createSigner } from "fast-jwt";
import {
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
  JWT_SECRET,
  NODE_ENV,
} from "./config.js";
import { v2 as cloudinary } from "cloudinary";
// jwt token gen
const genToken = (userId, res) => {
  const sign = createSigner({
    key: JWT_SECRET,
    algorithm: "HS256",
    expiresIn: "12h",
  });
  const token = sign({ userId });

  res.setCookie("jwt", token, {
    maxAge: 12 * 60 * 60,
    httpOnly: true,
    sameSite: "Strict",
    secure: NODE_ENV !== "dev",
  });

  return token;
};
// cloudinary config
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

export { genToken, cloudinary };
