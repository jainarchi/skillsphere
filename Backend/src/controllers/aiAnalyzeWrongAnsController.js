import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage} from "@langchain/core/messages"



const model = new ChatMistralAI({
model: "mistral-small-latest",
temperature: 0
});



export const aiAnalyzeWrongAnswers = async (req, res) => {
  try {
    const { wrongAnsArr } = req.body;

    if (!wrongAnsArr || wrongAnsArr.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }


    const tech = wrongAnsArr[0]?.tech || "General Technology";

   const promptText = `
You are a ${tech} tutor.

For each question below, explain the correct concept in 2-3 simple lines.
Do not mention what the user answered wrong.
Do not use any markdown, asterisks, bold, bullets or symbols.
Write in plain simple english.
Separate each explanation with one blank line.
Start directly, no greetings.

Questions to explain:
${JSON.stringify(wrongAnsArr, null, 2)}
`;




    const result = await model.invoke([new HumanMessage(promptText)]);
    const aiSummary = result.content

    res.status(200).json({
      success: true,
      summary: aiSummary,
    });

    
  } catch (error) {
    console.error("DETAILED BACKEND ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
