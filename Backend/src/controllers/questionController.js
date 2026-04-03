import Question from "../models/question.model.js";

/*
  GET RANDOM QUESTIONS
  /api/questions?technology=react&level=basic&limit=10
 */


export const getRandomQuestions = async (req, res) => {
  try {
    const { technology, level, limit = 10 } = req.query;

    if (!technology || !level) {
      return res.status(400).json({
        success: false,
        message: "technology and level are required"
      });
    }

    const questions = await Question.aggregate([
      {
        $match: {
          technology: technology.toLowerCase(),
          level: level.toLowerCase()
        }
      },
      { $sample: { size: Number(limit) } }
    ]);

    res.json({
      success: true,
      message : "Questions fetched successfully",
      questions,
    })

  } catch (err) {
    console.error("Get Questions Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
