import React, { useEffect, useState } from 'react';

const StudentDashboard = ({ email }) => {
  const [elections, setElections] = useState([]);
  const [contestants, setContestants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/getActiveElections")
      .then(res => res.json())
      .then(data => setElections(data.data || []));
  }, []);

  const fetchContestants = async (electionId, category) => {
    setSelectedCategory(category);
    const res = await fetch(`http://localhost:4000/api/v1/getContestants/${electionId}`);
    const data = await res.json();
    setContestants(data.data || []);
  };

  const vote = async (contestantId, electionId) => {
    const res = await fetch("http://localhost:4000/api/v1/castVotes", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ contestantId, electionId, email }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Student Dashboard</h2>

      <div className="flex gap-4 flex-wrap my-4">
        {elections.map(e => (
          <button key={e._id} onClick={() => fetchContestants(e._id, e.category)} className="bg-blue-400 text-white px-3 py-2 rounded">
            {e.category}
          </button>
        ))}
      </div>

      <h3 className="text-lg font-semibold">{selectedCategory ? `Vote for: ${selectedCategory}` : "Select a category"}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {contestants.map(c => (
          <div key={c._id} className="border p-4 rounded shadow">
            <img src={c.photo} alt={c.name} className="h-32 w-32 object-cover rounded-full mx-auto" />
            <p className="text-center mt-2 font-medium">{c.name}</p>
            <div className="text-center mt-2">
              <button onClick={() => vote(c._id, c.election)} className="bg-green-500 text-white px-3 py-1 rounded">Vote</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
