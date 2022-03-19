const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      lowercase: true,
      unique: true,
    },
    passwordHash: { type: String, required: true },
    todos: [{ type: Schema.Types.ObjectId, ref: "todo" }],
  },
  { timestamps: true }
);

module.exports = model("user", userSchema);
