import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IProject extends Document {
  slug: string;
  title: string;
  category: string[];
  date: string;
  overview: string;
  description: string;
  features: string[];
  technologies: string[];
  images: {
    cover: string;
    gallery: string[];
  };
  links: {
    live: string;
    githubClient: string;
    githubServer: string;
  };
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for this project.'],
  },
  category: {
    type: [String],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  technologies: {
    type: [String],
    required: true,
  },
  images: {
    cover: { type: String, required: true },
    gallery: { type: [String], default: [] },
  },
  links: {
    live: { type: String },
    githubClient: { type: String },
    githubServer: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Helper to check if model exists before compiling to avoid OverwriteModelError
const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
