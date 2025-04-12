// Frontend: App.jsx (React)
import React, { useState, useEffect } from 'react';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const generateQuestions = async () => {
    const res = await fetch(`http://localhost:4000/api/questions?count=${numQuestions}`);
    const data = await res.json();
    setQuestions(data.questions);
  };

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:4000/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, answers }),
    });
    const data = await res.json();
    setResult(data);
  };

  const handleReview = async () => {
    const res = await fetch(`http://localhost:4000/api/history?email=${email}`);
    const data = await res.json();
    setHistory(data.history);
  };

  if (!loggedIn) {
    return (
      <div>
        <h2>Register / Login</h2>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={async () => {
          await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          setLoggedIn(true);
        }}>Login/Register</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Math Quiz</h2>
      <select onChange={e => setNumQuestions(Number(e.target.value))}>
        {[10, 15, 20, 25, 30, 35, 40, 45, 50].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <button onClick={generateQuestions}>Start Quiz</button>

      {questions.map((q, idx) => (
        <div key={idx}>
          <label>{q}</label>
          <input onChange={e => setAnswers({ ...answers, [idx]: e.target.value })} />
        </div>
      ))}

      {questions.length > 0 && <button onClick={handleSubmit}>Submit Answers</button>}

      {result && (
        <div>
          <h3>Score: {result.score}</h3>
          <h3>Rank: {result.rank}</h3>
        </div>
      )}

      <button onClick={handleReview}>Review Past Scores</button>
      {history.map((h, idx) => (
        <div key={idx}>Attempt {idx + 1}: Score {h.score}, Rank {h.rank}</div>
      ))}
    </div>
  );
};

export default App;
