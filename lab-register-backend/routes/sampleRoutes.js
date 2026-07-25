const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all samples
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM samples ORDER BY sample_id DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch samples', error: error.message });
  }
});

// POST a new sample
router.post('/', async (req, res) => {
  const { patient_name, test_type, collected_date, status, processed_date, report_issued_date, collected_by } = req.body;

  // Validation
  if (!patient_name || patient_name.trim() === '') {
    return res.status(400).json({ message: 'Patient name is required' });
  }
  if (!test_type || test_type.trim() === '') {
    return res.status(400).json({ message: 'Test type is required' });
  }
  if (!collected_date) {
    return res.status(400).json({ message: 'Collected date is required' });
  }
  if (!collected_by || collected_by.trim() === '') {
    return res.status(400).json({ message: 'Collected by is required' });
  }
  const validStatuses = ['Pending', 'Processed', 'Report Issued'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO samples (patient_name, test_type, collected_date, status, processed_date, report_issued_date, collected_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [patient_name, test_type, collected_date, status || 'Pending', processed_date || null, report_issued_date || null, collected_by]
    );
    res.status(201).json({ message: 'Sample added successfully', sample_id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add sample', error: error.message });
  }
});

// PUT - update an existing sample
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { patient_name, test_type, collected_date, status, processed_date, report_issued_date, collected_by } = req.body;

  // Validation
  if (!patient_name || patient_name.trim() === '') {
    return res.status(400).json({ message: 'Patient name is required' });
  }
  if (!test_type || test_type.trim() === '') {
    return res.status(400).json({ message: 'Test type is required' });
  }
  if (!collected_date) {
    return res.status(400).json({ message: 'Collected date is required' });
  }
  if (!collected_by || collected_by.trim() === '') {
    return res.status(400).json({ message: 'Collected by is required' });
  }
  const validStatuses = ['Pending', 'Processed', 'Report Issued'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const [existing] = await db.query('SELECT * FROM samples WHERE sample_id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Sample not found' });
    }

    await db.query(
      `UPDATE samples SET patient_name = ?, test_type = ?, collected_date = ?, status = ?, processed_date = ?, report_issued_date = ?, collected_by = ?
       WHERE sample_id = ?`,
      [patient_name, test_type, collected_date, status, processed_date || null, report_issued_date || null, collected_by, id]
    );
    res.json({ message: 'Sample updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update sample', error: error.message });
  }
});

module.exports = router;