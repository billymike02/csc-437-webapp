import express, { Request, Response } from "express";
import { JournalPage } from "./pages/journal";
import { JournalsPage } from "./pages/journals";
import { connect } from "./services/mongo";
import { get } from "http";
import Journals from "./services/journal-svc";
import Goals from "./services/goal-svc";
import { journals } from "./routes/journals";
import { goals } from "./routes/goals";
import { friends } from "./routes/friends";
import auth, { authenticateUser } from "./routes/auth";

import { GoalsPage } from "./pages/goals";
import {LoginPage} from "./pages/auth";
import {ProfilePage} from "./pages/profile";

connect("blazing");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

// Middleware:
app.use(express.json());

app.use("/api/journals", authenticateUser, journals);
app.use("/api/goals", authenticateUser, goals);
app.use("/api/friends", authenticateUser, friends);
app.use("/auth", auth);

app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

// This function will fetch a journal by the ID to display it
app.get("/journals/:journalid", async (req: Request, res: Response) => {
  const { journalid } = req.params;
  const data = await Journals.get(journalid);
  const page = new JournalPage(data);

  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/goals/", async (req: Request, res: Response) => {
  const data = await Goals.index();

  const page = new GoalsPage(data);

  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/profile/", async (req: Request, res: Response) => {
  const data = "temp";

  const page = new ProfilePage(data);

  res.set("Content-Type", "text/html").send(page.render());
});

app.get("/journals/", async (req: Request, res: Response) => {
  const data = await Journals.index();
  const page = new JournalsPage(data);

  res.set("Content-Type", "text/html").send(page.render());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
