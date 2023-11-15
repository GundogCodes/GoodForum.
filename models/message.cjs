const mongoose = require("mongoose");

const messageSchmea = new mongoose.Schema(
  {
    sender: {
      type: String,
      require: true,
    },
    content: { type: String, trim: true, default: "" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchmea);

module.exports = Message;
