# Laboratory Sample Collection and Report Register

A digital register that tracks lab samples from collection through processing to report issue, so the lab can instantly see which samples are pending (and for how long), and answer a patient's report status immediately — replacing a paper register. (Demo is in the last line plz refer it)

## Problem (in two lines)

A diagnostic lab's paper register makes it slow to answer "is my report ready?" and lets samples sit unprocessed unnoticed, since nothing flags how long they've been waiting. This app records every sample, shows pending duration automatically, and makes status lookups instant.

## Tech Stack

- **Frontend:** React (Vite), plain CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL

## How to Run This Project

### Prerequisites
- Node.js installed
- MySQL installed and running

### 1. Database Setup
1. Open MySQL command line: `mysql -u root -p`
2. Run:
   ```sql
   CREATE DATABASE lab_register;
   USE lab_register;
   ```
3. Run the table creation and data insert scripts (see `database/schema.sql` in this repo).

### 2. Backend Setup
```bash
cd lab-register-backend
npm install
```
Create a `.env` file in `lab-register-backend` with:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=lab_register
PORT=5000
```
Start the server:
```bash
node server.js
```
Backend runs at `http://localhost:5000`

### 3. Frontend Setup
Open a new terminal:
```bash
cd lab-register-frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

**Both the backend and frontend must be running at the same time** for the app to work.

## Field Definitions

| Field | Meaning | Possible Values |
|---|---|---|
| `sample_id` | Unique auto-generated ID for each sample | Auto-incrementing number |
| `patient_name` | Name of the patient | Text |
| `test_type` | Type of lab test | e.g., Blood Test, Urine Test, Thyroid Test |
| `collected_date` | Date the sample was physically collected | Date |
| `status` | Current stage of the sample | `Pending`, `Processed`, `Report Issued` |
| `processed_date` | Date lab processing was completed | Date, or empty if not yet processed |
| `report_issued_date` | Date the report was handed to the patient | Date, or empty if not yet issued |
| `collected_by` | Lab technician who collected the sample | Text |

## How "Days Pending" Is Calculated

This is the key derived value the register is built around.

- If a sample's status is **Pending**, Days Pending = (today's date) − (collected_date), counted in whole days.
- If a sample's status is **Processed** or **Report Issued**, it is no longer waiting, so Days Pending is shown as **"—"** (not applicable).

This value is **never stored** in the database — it is calculated fresh every time the page loads, directly from `collected_date` and `status`. This guarantees it is always accurate and never goes stale, unlike a manually updated number.

**Manually verified example:** A sample collected on `2026-07-22`, viewed on `2026-07-25`, correctly shows Days Pending = 3.

## Features

- View all samples in a searchable, filterable table
- Search by patient name
- Filter by status
- Add a new sample (server-side validated)
- Edit/update an existing sample (server-side validated)
- Automatic Days Pending calculation
- Loading, empty, and error states handled throughout
- Responsive layout (usable on mobile and desktop)

## Known Awkward Test Cases (intentionally included in the dataset)

- A record with a missing `processed_date` despite being marked `Processed` (data-entry mistake scenario)
- A record with an unusually old `collected_date` (over a year old) still marked `Pending` — the exact "forgotten sample" scenario this app is meant to catch
- Two records with the same patient name (`Ravi Kumar`) but different sample IDs

## What Is Not Finished / Known Limitations

- No login/authentication — anyone with the URL can add/edit records
- No delete functionality (not required by the problem statement)
- No pagination — all records load at once (fine for the current dataset size)

## Screenshots

See the `/screenshots` folder in this repository.

## Demo Video

https://drive.google.com/file/d/1mgwXLMyf-D_S8ZgUg_bl4sIbzWIRHYU-/view?usp=sharing


