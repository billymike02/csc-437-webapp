import express, { Request, Response } from "express";
import { Goal } from "../models/goal";

import Goals from "../services/goal-svc";

export const goals = express.Router();

goals.get("/", (_, res: Response) => {
  Goals.index()
    .then((list: Goal[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

goals.post("/", (req: Request, res: Response) => {
  const newGoal = req.body;

  Goals.create(newGoal)
    .then((goal: Goal) => res.status(201).json(goal))
    .catch((err) => res.status(500).send(err));
});

goals.get("/:goalid", (req: Request, res: Response) => {
  const { goalid } = req.params;

  Goals.get(goalid)
    .then((goal: Goal) => res.json(goal))
    .catch((err) => res.status(404).send(err));
});

goals.put("/:goalid", (req: Request, res: Response) => {
  const { goalid } = req.params;
  const newGoal = req.body;

  Goals.update(goalid, newGoal)
    .then((goal: Goal) => {
      if (!goal) {
        return res
          .status(404)
          .json({ message: `Goal with ID ${goalid} not found` });
      }
      res.json(goal);
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging
      res
        .status(500)
        .json({ message: "An error occurred while updating the journal" });
    });
});

goals.delete("/:goalid", (req: Request, res: Response) => {
  const { goalid } = req.params;

  Goals.remove(goalid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});
