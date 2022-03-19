const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("todo", todoSchema);
