// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/math-assessment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  history: [
    {
      score: Number,
      total: Number,
      correctAnswers: Number,
      rank: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await Student.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const student = new Student({ name, email, password });
  await student.save();
  res.status(201).json({ message: 'Registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email, password });
  if (!student) return res.status(401).json({ message: 'Invalid credentials' });
  res.status(200).json({ message: 'Login successful', student });
});

function generateExpression() {
  const operators = ['+', '-', '*', '/'];
  const a = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);
  const c = Math.floor(Math.random() * 100);
  const op1 = operators[Math.floor(Math.random() * operators.length)];
  const op2 = operators[Math.floor(Math.random() * operators.length)];
  return `${a} ${op1} ${b} ${op2} ${c}`;
}

app.get('/api/questions/:count', (req, res) => {
  const count = parseInt(req.params.count);
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push(generateExpression());
  }
  res.json(questions);
});

app.post('/api/submit', async (req, res) => {
  const { email, questions, answers } = req.body;
  let correctAnswers = 0;

  questions.forEach((q, idx) => {
    try {
      const correct = eval(q).toFixed(2);
      const submitted = parseFloat(answers[idx]).toFixed(2);
      if (correct === submitted) correctAnswers++;
    } catch (e) {}
  });

  const student = await Student.findOne({ email });
  const score = (correctAnswers / questions.length) * 100;
  const history = await Student.find();

  const scores = history.map((s) => {
    const last = s.history[s.history.length - 1];
    return last ? last.score : 0;
  });
  scores.push(score);
  scores.sort((a, b) => b - a);
  const rank = scores.indexOf(score) + 1;

  student.history.push({ score, total: questions.length, correctAnswers, rank });
  await student.save();

  res.json({ message: 'Submitted', score, correctAnswers, total: questions.length, rank });
});

app.get('/api/history/:email', async (req, res) => {
  const student = await Student.findOne({ email: req.params.email });
  if (!student) return res.status(404).json({ message: 'Not found' });
  res.json(student.history);
});

app.listen(4000, () => console.log('Server running on port 4000'));
