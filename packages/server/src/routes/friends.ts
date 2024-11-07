import express, { Request, Response } from "express";
import { Friend } from "../models/friend";

import Friends from "../services/friend-svc";

export const friends = express.Router();

friends.get("/", (_, res: Response) => {
  Friends.index()
    .then((list: Friend[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

friends.post("/", (req: Request, res: Response) => {
  const newFriend = req.body;

  Friends.create(newFriend)
    .then((friend: Friend) => res.status(201).json(friend))
    .catch((err) => res.status(500).send(err));
});

friends.get("/:friendid", (req: Request, res: Response) => {
  const { friendid } = req.params;

  Friends.get(friendid)
    .then((friend: Friend) => res.json(friend))
    .catch((err) => res.status(404).send(err));
});

friends.put("/:friendid", (req: Request, res: Response) => {
  const { friendid } = req.params;
  const newFriend = req.body;

  Friends.update(friendid, newFriend)
    .then((friend: Friend) => {
      if (!friend) {
        return res
          .status(404)
          .json({ message: `Friend with ID ${friendid} not found` });
      }
      res.json(friend);
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging
      res
        .status(500)
        .json({ message: "An error occurred while updating the friend" });
    });
});

friends.delete("/:friendid", (req: Request, res: Response) => {
  const { friendid } = req.params;

  Friends.remove(friendid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});
