import mongoose from "mongoose";

export interface Friend {
  _id: mongoose.Types.ObjectId;
  displayName: string;
}
