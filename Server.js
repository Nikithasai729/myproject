const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(__dirname));
app.use(express.json());

let questions = [];

// 🧠 Get all questions
app.get("/api/questions", (req, res) => {
  res.json(questions);
});

// ✍️ Post a new question
app.post("/api/ask", (req, res) => {
  const { text } = req.body;
  questions.push({ id: questions.length + 1, text, answer: "" });
  res.json({ message: "Question added!" });
});

// 💬 Answer a question
app.post("/api/answer", (req, res) => {
  const { id, answer } = req.body;
  const q = questions.find(q => q.id === id);
  if (q) q.answer = answer;
  res.json({ message: "Answer added!" });
});

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Running at http://localhost:${PORT}`));
