import { model, Schema } from "mongoose";
import { Journal, Entry } from "../models/journal";

const JournalSchema = new Schema<Journal>({
  title: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  entries: { type: [] },
});

const JournalModel = model<Journal>("JournalSchema", JournalSchema);

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

export default { index, get, create, update, remove };
