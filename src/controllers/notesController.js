import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 10,
      tag,
      search,
    } = req.query;

    const filter = {};

    if (tag) {
      filter.tag = tag;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const currentPage = Number(page);
    const notesPerPage = Number(perPage);
    const skip = (currentPage - 1) * notesPerPage;

    const [totalNotes, notes] = await Promise.all([
      Note.countDocuments(filter),
      Note.find(filter).skip(skip).limit(notesPerPage),
    ]);

    const totalPages = Math.ceil(totalNotes / notesPerPage);

    res.status(200).json({
      page: currentPage,
      perPage: notesPerPage,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(createHttpError(400, 'Invalid note ID'));
    }

    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);

    res.status(201).json(note);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(createHttpError(400, error.message));
    }

    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.noteId,
      req.body,
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(createHttpError(400, 'Invalid note ID'));
    }

    if (error.name === 'ValidationError') {
      return next(createHttpError(400, error.message));
    }

    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    if (error.name === 'CastError') {
      return next(createHttpError(400, 'Invalid note ID'));
    }

    next(error);
  }
};