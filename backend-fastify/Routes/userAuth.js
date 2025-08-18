import { runQuery } from "../database.js";
import bcrypt from "@node-rs/bcrypt";
import {
  userCreatedResponse,
  userLogoutSchema,
} from "../schemas/respSchemas.js";
import { signUpReqSchema, loginReqSchema } from "../schemas/reqSchemas.js";
import { cloudinary, genToken } from "../utils.js";
import { protectedRoute } from "../middlewares/protectRoute.js";

function auth_route(fastify, options, done) {
  fastify.post(
    "/auth_signup",
    {
      schema: {
        body: signUpReqSchema,
        response: userCreatedResponse,
      },
    },
    async (req, res) => {
      const { full_name, email, password } = req.body;
      try {
        if (password.length < 6) {
          return res
            .code(401)
            .reply({ message: "password should be atleast 6 characters" });
        }

        const user = await runQuery("get_user.sql", [email]);

        if (user.length > 0) {
          return res
            .code(400)
            .send({ message: "user already exists please login" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const createdAt = new Date();
        console.time("query");
        const new_user = await runQuery("insert_new_user.sql", [
          email,
          full_name,
          hashedPass,
          createdAt,
        ]);
        
        genToken(new_user[0].id, res); //gen token
        delete new_user[0].password;
        return res.code(201).send(new_user[0]);
      } catch (error) {
        console.log(error);
      }
    }
  );

  fastify.post(
    "/auth_login",
    {
      schema: {
        body: loginReqSchema,
        response: userCreatedResponse,
      },
    },
    async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await runQuery("get_user.sql", [email]);
        if (user.length < 1) {
          return res.code(401).send({ message: "Invalid Credentials" });
        }
        const isPassCorrect = await bcrypt.compare(password, user[0].password);

        if (!isPassCorrect) {
          return res.code(401).send({ message: "Invalid Credentials" });
        }

        genToken(user[0].id, res);
        delete user[0].password;

        return res.code(201).send(user[0]);
      } catch (error) {
        console.log("login error - ", error);
      }
    }
  );

  fastify.post(
    "/auth_logout",
    {
      schema: {
        response: userLogoutSchema,
      },
    },
    async (req, res) => {
      try {
        res.setCookie("jwt", "", { maxAge: 0 });
        return res.code(200).send({ message: "logout successful" });
      } catch (error) {
        return res.code(400).send({ message: "Error logging out" });
      }
    }
  );

  fastify.put(
    "/profile",
    {
      schema: {
        response: userCreatedResponse,
      },
      preHandler: protectedRoute,
    },
    async (req, res) => {
      const { profile_pic } = req.body;
      const userId = req.user.userId;
      try {
        if (!profile_pic) {
          return res.code(400).send({ message: "no profile pic found" });
        }

        const upload_response = await cloudinary.uploader.upload(profile_pic);
        const updated_user = await runQuery("update_profile_pic.sql", [
          upload_response.secure_url,
          userId,
        ]);

        delete updated_user[0].password;
        res.code(201).send(updated_user[0]);
      } catch (error) {
        console.log("profile pic error- ", error);
      }
    }
  );

  fastify.get(
    "/check",
    {
      preHandler: protectedRoute,
      schema: {
        response: userCreatedResponse,
      },
    },
    async (req, res) => {
      try {
        const userId = req.user.userId;

        const user = await runQuery("get_user_byid.sql", [userId]);

        delete user[0].password;

        res.code(201).send(user[0]);
      } catch (error) {
        console.log(error);
      }
    }
  );

  done();
}
export { auth_route };
