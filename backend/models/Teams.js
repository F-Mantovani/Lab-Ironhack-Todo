const { Schema, model } = require("mongoose");

const teamsSchema = new Schema(
  {
    teamName: { type: String, required: true },
    user: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

module.exports = model("teams", teamsSchema);
