// SignUp Requests
const signUpReqSchema = {
  type: "object",
  required: ["email", "full_name", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    full_name: {
      type: "string",
      minLength: 1,
    },
    password: {
      type: "string",
      minLength: 6,
    },
  },
  additionalProperties: false,
};
//Login schema

const loginReqSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 6,
    },
  },
};

const chatSendSchema = {
  type: "object",
  properties: {
    text: { type: "string", minLength: 1 },
    image: { type: "string" },
  },
  required: ["text"],
  additionalProperties: false,
};

export { signUpReqSchema, loginReqSchema, chatSendSchema };
