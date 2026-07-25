CREATE DATABASE IF NOT EXISTS lab_register;
USE lab_register;

CREATE TABLE samples (
    sample_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    test_type VARCHAR(100) NOT NULL,
    collected_date DATE NOT NULL,
    status ENUM('Pending', 'Processed', 'Report Issued') NOT NULL DEFAULT 'Pending',
    processed_date DATE NULL,
    report_issued_date DATE NULL,
    collected_by VARCHAR(100) NOT NULL
);

INSERT INTO samples (patient_name, test_type, collected_date, status, processed_date, report_issued_date, collected_by) VALUES
('Anitha Raj', 'Blood Test', '2026-07-18', 'Report Issued', '2026-07-19', '2026-07-20', 'Suresh Nair'),
('Kavya Menon', 'Urine Test', '2026-07-20', 'Processed', '2026-07-21', NULL, 'Suresh Nair'),
('Ravi Kumar', 'Blood Sugar', '2026-07-21', 'Pending', NULL, NULL, 'Deepa Iyer'),
('Farida Begum', 'Lipid Profile', '2026-07-15', 'Report Issued', '2026-07-16', '2026-07-17', 'Suresh Nair'),
('Joseph Thomas', 'Blood Test', '2026-07-22', 'Pending', NULL, NULL, 'Deepa Iyer'),
('Meena Pillai', 'Thyroid Test', '2026-07-10', 'Report Issued', '2026-07-11', '2026-07-12', 'Ajay Varma'),
('Sundar Rajan', 'Urine Test', '2026-07-19', 'Processed', NULL, NULL, 'Suresh Nair'),
('Lakshmi Devi', 'Blood Test', '2026-07-23', 'Pending', NULL, NULL, 'Deepa Iyer'),
('Vikram Singh', 'X-Ray Marker', '2026-07-17', 'Report Issued', '2026-07-18', '2026-07-19', 'Ajay Varma'),
('Priya Sharma', 'Blood Sugar', '2026-07-20', 'Processed', '2026-07-21', NULL, 'Suresh Nair'),
('Arjun Nair', 'Lipid Profile', '2026-07-16', 'Report Issued', '2026-07-17', '2026-07-18', 'Deepa Iyer'),
('Fathima Beevi', 'Blood Test', '2026-07-22', 'Pending', NULL, NULL, 'Ajay Varma'),
('George Mathew', 'Urine Test', '2026-07-14', 'Report Issued', '2026-07-15', '2026-07-16', 'Suresh Nair'),
('Nandini Rao', 'Thyroid Test', '2026-07-21', 'Processed', '2026-07-22', NULL, 'Deepa Iyer'),
('Suresh Babu', 'Blood Test', '2025-05-10', 'Pending', NULL, NULL, 'Ajay Varma'),
('Divya Prakash', 'Blood Sugar', '2026-07-23', 'Pending', NULL, NULL, 'Suresh Nair'),
('Mohammed Ali', 'Lipid Profile', '2026-07-18', 'Report Issued', '2026-07-19', '2026-07-20', 'Deepa Iyer'),
('Ravi Kumar', 'Thyroid Test', '2026-07-12', 'Report Issued', '2026-07-13', '2026-07-14', 'Ajay Varma'),
('Anjali Verma', 'X-Ray Marker', '2026-07-22', 'Pending', NULL, NULL, 'Suresh Nair'),
('Karthik Iyer', 'Blood Test', '2026-07-09', 'Report Issued', '2026-07-10', '2026-07-11', 'Deepa Iyer');