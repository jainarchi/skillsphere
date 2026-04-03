import notesModel from '../models/notes.model.js';

export const createNote = async (req, res) => {
  try {

    const { title, content, tech, isAI } = req.body;

    const savedNote = await notesModel.create({
      userId: req.user.id, 
      title,
      content,
      tech,
      isAI: isAI || false,
    });

    res.status(201).json({ 
      success: true,
      message : "Note created successfully",
       note: savedNote 
      });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};



export const getMyNotes = async (req, res) => {
  try {
    console.log("getting...")
    const notes = await notesModel.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      message : "Notes fetched successfully",
      notes 
    });

  } catch (err) {
    console.log("Error in getting notes" , err)
    res.status(500).json({
       success: false, 
       message: err.message 
    })
  }
}




export const deleteNote = async (req, res) => {
  try {

    const noteId = req.params.id;
    const note = await notesModel.findById(noteId);

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

   
    if (note.userId.toString() !== req.user.id.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await notesModel.findByIdAndDelete(noteId);

    res.status(200).json({ success: true, message: "Note deleted successfully" });


  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};