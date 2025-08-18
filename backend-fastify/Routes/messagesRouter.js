import { runQuery } from "../database.js";
import { protectedRoute } from "../middlewares/protectRoute.js";
import {
  chatMessageSchema,
  getChatusersSchema,
} from "../schemas/respSchemas.js";
import { chatSendSchema } from "../schemas/reqSchemas.js";
import { cloudinary } from "../utils.js";


function messageroute(fastify, options, done) {
  fastify.get(
    "/users",
    {
      schema: {
        response: getChatusersSchema,
      },
      preHandler: protectedRoute,
    },
    async (req, res) => {
      try {
        const cur_user_id = req.user.userId;
        const filteredUsers = await runQuery("get_chat_users.sql", [
          cur_user_id,
        ]);

        res.code(200).send(filteredUsers);
      } catch (error) {
        res.code(400).send({ message: "Bad request" });
        console.log(error);
      }
    }
  );

  fastify.get(
    "/messages/:id",
    {
      schema: {},
      preHandler: protectedRoute,
    },
    async (req, res) => {
      try {
        const { id: recieverId } = req.params;
        console.log(recieverId);

        const senderId = req.user.userId;

        const messages = await runQuery("get_users_chat.sql", [
          senderId,
          recieverId,
        ]);

        res.code(200).send(messages);
      } catch (error) {
        res.code(500).send({ Error: "Internal server error" });
      }
    }
  );

  fastify.post(
    "/send/:id",
    {
      schema: {
        body: chatSendSchema,
        response: chatMessageSchema,
      },
      preHandler: protectedRoute,
    },
    async (req, res) => {
      try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user.userId;
        let imageUrl = "";
        if (image) {
          const uploadResponse = cloudinary.uploader.upload(image);
          imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await runQuery("insert_message.sql", [
          senderId,
          recieverId,
          text,
          imageUrl,
        ]);

        //todo real time functionality

        res.code(201).send(newMessage[0]);
      } catch (error) {
        console.log("send message error", error);
      }
    }
  );

  done();
}

export { messageroute };
