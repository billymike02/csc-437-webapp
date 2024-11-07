import express, { Request, Response } from "express";
import { Journal } from "../models/journal";

import Journals from "../services/journal-svc";

export const journals = express.Router();

journals.get("/", (_, res: Response) => {
  Journals.index()
    .then((list: Journal[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

journals.post("/", (req: Request, res: Response) => {
  const newJournal = req.body;

  Journals.create(newJournal)
    .then((journal: Journal) => res.status(201).json(journal))
    .catch((err) => res.status(500).send(err));
});

journals.get("/:journalid", (req: Request, res: Response) => {
  const { journalid } = req.params;

  Journals.get(journalid)
    .then((journal: Journal) => res.json(journal))
    .catch((err) => res.status(404).send(err));
});

journals.put("/:journalid", (req: Request, res: Response) => {
  const { journalid } = req.params;
  const newJournal = req.body;

  Journals.update(journalid, newJournal)
    .then((journal: Journal) => {
      if (!journal) {
        return res
          .status(404)
          .json({ message: `Journal with ID ${journalid} not found` });
      }
      res.json(journal);
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging
      res
        .status(500)
        .json({ message: "An error occurred while updating the journal" });
    });
});

journals.delete("/:journalid", (req: Request, res: Response) => {
  const { journalid } = req.params;

  Journals.remove(journalid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});