
import { model, Schema } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    tag: {
      type: String,
      enum: ['Todo', 'InProgress', 'Done'],
      default: 'Todo',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Note = model('Note', noteSchema);

export default Note;
