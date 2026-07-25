function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function calculateDaysPending(sample) {
  if (sample.status !== 'Pending') return '—';
  const collected = new Date(sample.collected_date);
  const today = new Date();
  const collectedMidnight = new Date(collected.getFullYear(), collected.getMonth(), collected.getDate());
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffTime = todayMidnight - collectedMidnight;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function SampleTable({ samples, onEdit }) {
  return (
    <div className="table-wrapper">
      <table className="sample-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Test Type</th>
            <th>Collected Date</th>
            <th>Status</th>
            <th>Days Pending</th>
            <th>Collected By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((sample) => (
            <tr key={sample.sample_id}>
              <td>{sample.sample_id}</td>
              <td>{sample.patient_name}</td>
              <td>{sample.test_type}</td>
              <td>{formatDate(sample.collected_date)}</td>
              <td>
                <span className={`status-badge status-${sample.status === 'Report Issued' ? 'issued' : sample.status.toLowerCase()}`}>
                  {sample.status}
                </span>
              </td>
              <td>{calculateDaysPending(sample)}</td>
              <td>{sample.collected_by}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(sample)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SampleTable;