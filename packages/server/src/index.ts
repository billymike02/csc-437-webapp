import express, { Request, Response } from "express";
import { JournalPage } from "./pages/journal";
import { connect } from "./services/mongo";
import { get } from "http";
import Journals from "./services/journal-svc";
import { journals } from "./routes/journals";

connect("blazing");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

// Middleware:
app.use(express.json());

app.use("/api/journals", journals);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
