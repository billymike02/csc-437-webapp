import express, { Request, Response } from "express";
import { JournalPage } from "./pages/journal";
import { connect } from "./services/mongo";
import { get } from "http";
import Journals from "./services/journal-svc";

connect("blazing");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.get("/journal/:journalTitle", (req: Request, res: Response) => {
  const { journalTitle } = req.params;

  Journals.get(journalTitle).then((data) => {
    const page = new JournalPage(data);

    res.set("Content-Type", "text/html").send(page.render());
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
