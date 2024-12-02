import mongoose from "mongoose";

export interface Journal {
  _id: mongoose.Types.ObjectId;
  title: string;
  startDate: Date;
  endDate?: Date;
  content?: String;
}

export interface Entry {
  _id: mongoose.Types.ObjectId;
  date: Date;
  subject?: string;
  content?: string;
}
