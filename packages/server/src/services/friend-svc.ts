import { model, Schema } from "mongoose";
import { Friend } from "../models/friend";

const FriendSchema = new Schema<Friend>({
  displayName: { type: String, required: true, trim: true },
});

const FriendModel = model<Friend>("FriendSchema", FriendSchema);

function index(): Promise<Friend[]> {
  return FriendModel.find();
}

function get(friendid: string): Promise<Friend> {
  return FriendModel.findById(friendid)
    .then((friend) => {
      if (!friend) {
        throw new Error(`Goal with ID ${friendid} not found`);
      }
      return friend; // Return the found journal
    })
    .catch((err) => {
      // Log the actual error for debugging purposes
      console.error(err);
      throw new Error("An error occurred while retrieving the friend");
    });
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

export default { index, get, create, update, remove };
