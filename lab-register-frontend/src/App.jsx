import { useState, useEffect } from 'react';
import './App.css';
import SampleTable from './components/SampleTable';
import AddSampleForm from './components/AddSampleForm';

const API_URL = 'http://localhost:5000/api/samples';

function App() {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingSample, setEditingSample] = useState(null);

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch samples');
      }
      const data = await response.json();
      setSamples(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSampleSaved = () => {
    setEditingSample(null); // exit edit mode
    fetchSamples();         // refresh table
  };

  const filteredSamples = samples.filter((sample) => {
    const matchesSearch = sample.patient_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || sample.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app">
      <h1>Laboratory Sample Register</h1>
      <p className="subtitle">Total samples: {filteredSamples.length}</p>

      <AddSampleForm
        apiUrl={API_URL}
        onSampleSaved={handleSampleSaved}
        editingSample={editingSample}
        onCancelEdit={() => setEditingSample(null)}
      />

      <div className="controls">
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-select"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processed">Processed</option>
          <option value="Report Issued">Report Issued</option>
        </select>
      </div>

      {loading && <p>Loading samples...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && filteredSamples.length === 0 && (
  <p className="empty-state">
    No samples found. {searchTerm || statusFilter !== 'All' ? 'Try adjusting your search or filter.' : 'Add your first sample using the form above.'}
  </p>
)}
{!loading && !error && filteredSamples.length > 0 && (
  <SampleTable samples={filteredSamples} onEdit={setEditingSample} />
)}
    </div>
  );
}

export default App;