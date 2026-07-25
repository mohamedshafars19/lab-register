import { useState, useEffect } from 'react';

const emptyForm = {
  patient_name: '',
  test_type: '',
  collected_date: '',
  status: 'Pending',
  processed_date: '',
  report_issued_date: '',
  collected_by: ''
};

function AddSampleForm({ onSampleSaved, apiUrl, editingSample, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const isEditing = Boolean(editingSample);

  // When editingSample changes (user clicked Edit), fill the form with its data
  useEffect(() => {
    if (editingSample) {
      setFormData({
        patient_name: editingSample.patient_name || '',
        test_type: editingSample.test_type || '',
        collected_date: editingSample.collected_date ? editingSample.collected_date.split('T')[0] : '',
        status: editingSample.status || 'Pending',
        processed_date: editingSample.processed_date ? editingSample.processed_date.split('T')[0] : '',
        report_issued_date: editingSample.report_issued_date ? editingSample.report_issued_date.split('T')[0] : '',
        collected_by: editingSample.collected_by || ''
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingSample]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const url = isEditing ? `${apiUrl}/${editingSample.sample_id}` : apiUrl;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to save sample');
      }

      setFormData(emptyForm);
      onSampleSaved();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="sample-form" onSubmit={handleSubmit}>
      <h3>{isEditing ? `Edit Sample #${editingSample.sample_id}` : 'Add New Sample'}</h3>

      {formError && <p className="form-error">{formError}</p>}

      <div className="form-row">
        <label>Patient Name</label>
        <input type="text" name="patient_name" value={formData.patient_name} onChange={handleChange} required />
      </div>

      <div className="form-row">
        <label>Test Type</label>
        <input type="text" name="test_type" value={formData.test_type} onChange={handleChange} required />
      </div>

      <div className="form-row">
        <label>Collected Date</label>
        <input type="date" name="collected_date" value={formData.collected_date} onChange={handleChange} required />
      </div>

      <div className="form-row">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Processed">Processed</option>
          <option value="Report Issued">Report Issued</option>
        </select>
      </div>

      <div className="form-row">
        <label>Processed Date (optional)</label>
        <input type="date" name="processed_date" value={formData.processed_date} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Report Issued Date (optional)</label>
        <input type="date" name="report_issued_date" value={formData.report_issued_date} onChange={handleChange} />
      </div>

      <div className="form-row">
        <label>Collected By</label>
        <input type="text" name="collected_by" value={formData.collected_by} onChange={handleChange} required />
      </div>

      <div className="form-buttons">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : isEditing ? 'Update Sample' : 'Add Sample'}
        </button>
        {isEditing && (
          <button type="button" className="cancel-btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddSampleForm;