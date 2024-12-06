import { model, Schema } from "mongoose";
import { Journal, Entry } from "../models/journal";
import {json} from "express";

const JournalSchema = new Schema<Journal>({
  title: { type: String, required: false, trim: true },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  content: { type: String, required: false },
});

const JournalModel = model<Journal>("Journal", JournalSchema);

function index(): Promise<Journal[]> {
  return JournalModel.find();
}

function get(journalid: string): Promise<Journal> {
    return JournalModel.findById(journalid)
      .then((journal) => {
        if (!journal) {
          throw new Error(`Journal with ID ${journalid} not found`);
        }
        return journal; // Return the found journal
      })
      .catch((err) => {
        // Log the actual error for debugging purposes
        console.error(err);
        throw new Error("An error occurred while retrieving the journal");
      });
}

function create(json: Journal): Promise<Journal> {
  const j = new JournalModel(json);
  return j.save();
}

function createDefault(): Promise<Journal> {
  const content = ""

  const new_journal = { content }

  const j = new JournalModel(new_journal);

  console.log("Creating journal for user.");
  return j.save();
}

function update(journalid: string, journal: Journal): Promise<Journal> {
  return JournalModel.findOneAndUpdate({ _id: journalid }, journal, {
    new: true,
  }).then((updated) => {
    if (!updated) {
      throw new Error(`Journal with ID ${journalid} not found for update`);
    }

    return updated as Journal; // Ensure this matches your Journal type
  });
}

function remove(journalid: String): Promise<void> {
  return JournalModel.findOneAndDelete({ _id: journalid }).then((deleted) => {
    if (!deleted) throw `${journalid} not deleted`;
  });
}

export default { index, get, create, update, remove, createDefault };
