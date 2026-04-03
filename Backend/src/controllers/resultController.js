import Result from "../models/result.model.js";

export const createResult = async (req , res) => {

  try{
    const { title, technology, level, totalQuestions, correct, wrong } = req.body;


    if(! technology || !level || totalQuestions === undefined ||correct === undefined ){
        return res.status(400).json({
            success: false,
            message: "Missing fields"
        })
    }



    // compute wrong if not provided
    const computedWrong = wrong !== undefined ? Number(wrong) : Math.max(0, Number(totalQuestions) - Number(correct));



    const payload = {
      title: String(title).trim(),
      technology,
      level,
      totalQuestions: Number(totalQuestions),
      correct: Number(correct),
      wrong: computedWrong,
      user: req.user.id
    };


    const created = await Result.create(payload);

    return res.status(201).json({
        success: true,
        message: 'Result Created ',
        result: created
    })


    }catch (err){
        console.error('CreateResult Error: ' , err)
        return res.status(500).json({
            success: false ,
            message : 'Server Error'
        })
    }
}



// List the result
export const listResult = async (req, res) => {
  try {

    const { technology } = req.query;
    const query = { user: req.user.id };

    if (technology && technology.toLowerCase() !== "all") {
      query.technology = technology;
    }

    const items = await Result.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      message: "Results Fetched Successfully",
      results: items,
    });
  }
   catch (err) {
    console.error("ListResults Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
