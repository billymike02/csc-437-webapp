import { model, Schema } from "mongoose";
import { Goal } from "../models/goal";

const GoalSchema = new Schema<Goal>({
  name: { type: String, required: true, trim: true },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
});

const GoalModel = model<Goal>("GoalSchema", GoalSchema);

function index(): Promise<Goal[]> {
  return GoalModel.find();
}

function get(goalid: string): Promise<Goal> {
  return GoalModel.findById(goalid)
    .then((goal) => {
      if (!goal) {
        throw new Error(`Goal with ID ${goalid} not found`);
      }
      return goal; // Return the found journal
    })
    .catch((err) => {
      // Log the actual error for debugging purposes
      console.error(err);
      throw new Error("An error occurred while retrieving the goal");
    });
}

function create(json: Goal): Promise<Goal> {
  const j = new GoalModel(json);
  return j.save();
}

function update(goalid: string, goal: Goal): Promise<Goal> {
  return GoalModel.findOneAndUpdate({ _id: goalid }, goal, {
    new: true,
    useFindAndModify: false, // Optional: depending on your Mongoose version
  }).then((updated) => {
    if (!updated) {
      throw new Error(`Goal with ID ${goalid} not found for update`);
    }
    return updated as Goal; // Ensure this matches your Journal type
  });
}

function remove(goalid: String): Promise<void> {
  return GoalModel.findOneAndDelete({ _id: goalid }).then((deleted) => {
    if (!deleted) throw `${goalid} not deleted`;
  });
}

export default { index, get, create, update, remove };
