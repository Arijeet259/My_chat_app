// signUp schemas
const userCreatedResponse = {
  201: {
    description: "Successfully returned a user",
    type: "object",
    properties: {
      id: { type: "integer" },
      email: { type: "string", format: "email" },
      full_name: { type: "string" },
      profile_pic: { type: ["string", "null"], format: "uri" },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: ["string", "null"], format: "date-time" },
    },
    required: [
      "id",
      "email",
      "full_name",
      "profile_pic",
      "created_at",
      "updated_at",
    ],
  },
  401: {
    description: "Unauthroized",
    type: "object",
    properties: {
      message: { type: "string" },
    },
    required: ["message"],
  },
  400: {
    description: "Bad request",
    type: "object",
    properties: {
      message: { type: "string" },
    },
    required: ["message"],
  },
};

//Logout schema

const userLogoutSchema = {
  200: {
    description: "logout",
    type: "object",
    properties: {
      message: { type: "string" },
    },
    required: ["message"],
  },
  400: {
    description: "logout - error",
    type: "object",
    properties: {
      message: { type: "string" },
    },
    required: ["message"],
  },
};

//Messages get users Schema

const getChatusersSchema = {
  200: {
    type: "array",
    items: {
      description: "Successfully returned a user",
      type: "object",
      properties: {
        id: { type: "integer" },
        email: { type: "string", format: "email" },
        full_name: { type: "string" },
        profile_pic: { type: ["string", "null"], format: "uri" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: ["string", "null"], format: "date-time" },
      },
      required: [
        "id",
        "email",
        "full_name",
        "profile_pic",
        "created_at",
        "updated_at",
      ],
    },
  },
};

// send message schema

const chatMessageSchema = {
  200: {
    description: "Successfully returned a chat message",
    type: "object",
    properties: {
      id: { type: "integer" },
      sender_id: { type: "integer" },
      receiver_id: { type: "integer" },
      text: { type: "string" },
      image: { type: ["string", "null"] },
      created_at: { type: "string", format: "date-time" },
    },
    required: ["id", "sender_id", "receiver_id", "text", "created_at"],
  },
};

export {
  userCreatedResponse,
  userLogoutSchema,
  getChatusersSchema,
  chatMessageSchema,
};
