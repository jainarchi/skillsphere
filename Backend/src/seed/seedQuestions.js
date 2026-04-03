import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from '../models/question.model.js';
import questionsData from './questions.data.js'; 

dotenv.config();

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Question.deleteMany({});
    console.log("Old questions removed");

    const questionsToInsert = [];
    const invalidQuestions = [];

    for (const tech in questionsData) {
      for (const levelKey in questionsData[tech]) {
        const questionsArray = questionsData[tech][levelKey];

        // FIX: Map 'advance' to 'advanced' to satisfy Mongoose Enum
        const finalLevel = levelKey === "advance" ? "advanced" : levelKey;

        questionsArray.forEach((q, index) => {
          // Validation: Check for exactly 4 options
          if (!q.options || !Array.isArray(q.options) || q.options.length !== 4) {
            invalidQuestions.push({
              location: `${tech} > ${levelKey} > index ${index}`,
              question: q.question ? q.question.substring(0, 50) + "..." : "EMPTY",
              optionCount: q.options ? q.options.length : 0
            });
          } else {
            // Flatten and push
            questionsToInsert.push({
              ...q,
              technology: tech.toLowerCase(), 
              level: finalLevel.toLowerCase() 
            });
          }
        });
      }
    }

    if (invalidQuestions.length > 0) {
      console.error("Validation Failed! Check the table below:");
      console.table(invalidQuestions);
      process.exit(1); 
    }

    // Insert to MongoDB
    if (questionsToInsert.length > 0) {
      await Question.insertMany(questionsToInsert);
      console.log(` ${questionsToInsert.length} questions seeded successfully!`);
    } else {
      console.log("No valid questions found to seed.");
    }

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err.message);
    process.exit(1);
  }
};

seedQuestions();