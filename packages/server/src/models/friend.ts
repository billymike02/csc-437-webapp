import mongoose from "mongoose";

export interface Friend {
  _id: mongoose.Types.ObjectId;
  username: string;
  age: number;
  weight: number;
  journalId: string;
}
