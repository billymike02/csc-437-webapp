import { model, Schema } from "mongoose";
import { Journal, Entry } from "../models/journal";

const JournalSchema = new Schema<Journal>({
  title: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  entries: { type: [] },
});

const JournalModel = model<Journal>("Temp", JournalSchema);

const journals = {
  daily_journal: {
    title: "Daily Journal",
    startDate: new Date("2024-10-14"),
    endDate: new Date("2025-10-14"),
    entries: [
      {
        date: new Date("2024-10-14"),
        subject: "Started my journal",
      },
    ],
  },
};

function index(): Promise<Journal[]> {
  return JournalModel.find();
}

function get(journalTitle: string): Promise<Journal> {
  return JournalModel.find({ journalTitle })
    .then((list) => list[0])
    .catch((err) => {
      throw `${journalTitle} Not Found`;
    });
}

export default { index, get };
