import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ email }) => {
  const [electionData, setElectionData] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [contestantForm, setContestantForm] = useState({ name: "", photo: "", electionId: "" });

  useEffect(() => {
    fetchActiveElections();
  }, []);

  const fetchActiveElections = async () => {
    const res = await fetch("http://localhost:4000/api/v1/getActiveElections");
    const data = await res.json();
    setElectionData(data.data || []);
  };

  const createElection = async () => {
    console.log(title,category,email);
    await fetch("http://localhost:4000/api/v1/createElection", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title, category, email }),
    });
    fetchActiveElections();
  };

  const addContestant = async () => {
    await fetch("http://localhost:4000/api/v1/addContestants", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...contestantForm, email }),
    });
    setContestantForm({ name: "", photo: "", electionId: "" });
  };

  const disableElection = async (id) => {
    await fetch("http://localhost:4000/api/v1/disableElections", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ electionId: id, email }),
    });
    fetchActiveElections();
  };

  const announceWinner = async (id) => {
    const res = await fetch(`http://localhost:4000/api/v1/announceWinners/${id}`);
    const data = await res.json();
    alert(JSON.stringify(data.data.map(c => c.name).join(', ')));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>

      {/* Create Election */}
      <div className="my-4">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border" />
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="border ml-2" />
        <button onClick={createElection} className="ml-2 bg-blue-500 text-white px-2 py-1">Create Election</button>
      </div>

      {/* Add Contestant */}
      <div className="my-4">
        <input type="text" placeholder="Name" value={contestantForm.name} onChange={e => setContestantForm({ ...contestantForm, name: e.target.value })} className="border" />
        <input type="text" placeholder="Photo URL" value={contestantForm.photo} onChange={e => setContestantForm({ ...contestantForm, photo: e.target.value })} className="border ml-2" />
        <input type="text" placeholder="Election ID" value={contestantForm.electionId} onChange={e => setContestantForm({ ...contestantForm, electionId: e.target.value })} className="border ml-2" />
        <button onClick={addContestant} className="ml-2 bg-green-500 text-white px-2 py-1">Add Contestant</button>
      </div>

      {/* Active Elections */}
      <div>
        <h3 className="font-semibold">Active Elections</h3>
        {electionData.map(e => (
          <div key={e._id} className="border p-2 my-2">
            <p>Title: {e.title}</p>
            <p>Category: {e.category}</p>
            <button onClick={() => disableElection(e._id)} className="bg-red-500 text-white px-2 py-1 mr-2">Disable</button>
            <button onClick={() => announceWinner(e._id)} className="bg-yellow-500 text-white px-2 py-1">Announce Winner</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
