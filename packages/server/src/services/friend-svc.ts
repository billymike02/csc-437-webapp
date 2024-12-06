import { model, Schema } from "mongoose";
import { Friend } from "../models/friend";
import Journals from "../services/journal-svc";

const FriendSchema = new Schema<Friend>({
  username: { type: String, required: true, trim: true },
  age: { type: Number, required: false },
  weight: { type: Number, required: false },
  journalId: { type: String, ref: "Journal", required: true }, // Add this
});

const FriendModel = model<Friend>("FriendSchema", FriendSchema);

function index(): Promise<Friend[]> {
  return FriendModel.find();
}

function get(username: string): Promise<Friend> {
  return FriendModel.find({ username: username })
      .then((list) => list[0])
      .catch(() => {
        throw `${username} Not Found`;
      });
}


async function createFromUsername(username: string): Promise<Friend> {

  const new_Journal = await Journals.createDefault()
  let journalId = new_Journal._id

  const new_user = { username, journalId };
  const j = new FriendModel(new_user);

  return j.save();
}

function create(json: Friend): Promise<Friend> {
  const j = new FriendModel(json);
  return j.save();
}

function update(friendid: string, friend: Friend): Promise<Friend> {
  return FriendModel.findOneAndUpdate({ _id: friendid }, friend, {
    new: true,
    useFindAndModify: false, // Optional: depending on your Mongoose version
  }).then((updated) => {
    if (!updated) {
      throw new Error(`Friend with ID ${friendid} not found for update`);
    }
    return updated as Friend; // Ensure this matches your Journal type
  });
}

function remove(friendid: String): Promise<void> {
  return FriendModel.findOneAndDelete({ _id: friendid }).then((deleted) => {
    if (!deleted) throw `${friendid} not deleted`;
  });
}

export default { index, get, create, update, remove, createFromUsername };
