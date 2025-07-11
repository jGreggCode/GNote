import Note from "../models/Note.js";

async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note)
      return res.status(404).json({
        message: "Note id not found!",
      });

    res.status(200).json({
      message: "Note found",
      data: note,
    });
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
    });

    const savedNote = await note.save();
    res.status(201).json({
      message: "Note created successfully!",
      data: savedNote,
    });
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
async function updateNoteById(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note id not found!" });

    res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.error("Error in updateNoteById controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
async function deleteNoteById(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({
        message: "Note id not found",
      });

    res.status(200).json({
      message: "Note deleted successfully!",
      data: deletedNote,
    });
  } catch (error) {
    console.error("Error in deleteNoteById controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export { getAllNotes, createNote, updateNoteById, deleteNoteById, getNoteById };
