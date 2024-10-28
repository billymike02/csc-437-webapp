import { Journal } from "models/journal";
import { title } from "process";

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

export function getJournal(_: string) {
  return journals["daily_journal"];
}
