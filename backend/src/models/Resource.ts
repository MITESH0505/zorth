import mongoose, { Schema, Document } from "mongoose";

export interface IResource extends Document {
  title: string;
  url: string;
  description: string;
  category: mongoose.Types.ObjectId;
  tags: string[];
  featured: boolean;
  rating: number;
  createdAt: Date;
}

const resourceSchema = new Schema<IResource>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IResource>(
  "Resource",
  resourceSchema
);