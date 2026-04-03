import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    technology: {
      type: String,
      required: true,
      lowercase: true,
      enum: [
        "html",
        "css",
        "js",
        "react",
        "node",
        "mongodb",
        "java",
        "oops",
        "cpp",
      ]
    },

    level: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["basic", "intermediate", "advanced"]
    },

    question: {
      type: String,
      required: true,
      trim: true
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: arr => arr.length === 4,
        message: "Exactly 4 options required"
      }
    },

    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3
    },

    explanation: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);


const questionModel = mongoose.model('question' , QuestionSchema)
export default questionModel;

