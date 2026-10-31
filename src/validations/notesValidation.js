
import { Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

// Валідація ID нотатки
const noteId = Joi.string()
  .custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.error('any.invalid');
    }

    return value;
  })
  .required();

// Валідація параметрів GET /notes
const notesQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  perPage: Joi.number().integer().min(5).max(20).default(10),
  tag: Joi.string().valid(...TAGS),
  search: Joi.string().allow(''),
});

// Валідація тіла POST /notes
const createNoteBodySchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().allow(''),
  tag: Joi.string().valid(...TAGS),
});

// Валідація тіла PATCH /notes/:noteId
const updateNoteBodySchema = Joi.object({
  title: Joi.string().min(1),
  content: Joi.string().allow(''),
  tag: Joi.string().valid(...TAGS),
}).min(1);

// GET /notes
export const getAllNotesSchema = {
  query: notesQuerySchema,
};

// GET /notes/:noteId та DELETE /notes/:noteId
export const noteIdSchema = {
  params: Joi.object({
    noteId,
  }),
};

// POST /notes
export const createNoteSchema = {
  body: createNoteBodySchema,
};

// PATCH /notes/:noteId
export const updateNoteSchema = {
  params: Joi.object({
    noteId,
  }),
  body: updateNoteBodySchema,
};
