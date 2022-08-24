const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    deadline: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      // enum: ["interview", "declined", "pending"],
      default: "not done",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    creationDate: {
      type: String,
    },
  },
  //   due to timestamp when we add job we get two new keys as createdAt and updatedAt
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
