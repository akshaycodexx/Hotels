// Folder Structure:
// backend/
//   server.js
//   models/Student.js
//   routes/studentRoutes.js
// frontend/
//   src/
//     components/
//       AddStudent.jsx
//       ListStudent.jsx
//     App.js
//     index.js
//     App.css

// ===================== BACKEND =====================
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/students', studentRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

// .env (create this file in backend folder)
// MONGO_URI=your_mongo_atlas_connection_string_here

// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  grade: String,
  isActive: Boolean,
});

module.exports = mongoose.model('Student', StudentSchema);

// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.post('/', async (req, res) => {
  const newStudent = new Student(req.body);
  const saved = await newStudent.save();
  res.json(saved);
});

router.put('/:id', async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Student.findByIdAndDelete(req.params.id);
  res.json(deleted);
});

module.exports = router;

// ===================== FRONTEND =====================
// src/components/AddStudent.jsx
import { useState } from 'react';
import axios from 'axios';
import './AddStudent.css';

function AddStudent({ onAdd }) {
  const [form, setForm] = useState({ name: '', email: '', grade: '', isActive: true });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/students', form);
    onAdd(res.data);
    setForm({ name: '', email: '', grade: '', isActive: true });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="grade" value={form.grade} onChange={handleChange} placeholder="Grade" required />
      <label className="checkbox">
        <input name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} /> Active?
      </label>
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudent;

// src/components/ListStudent.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import './ListStudent.css';

function ListStudent() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:5000/api/students');
    setStudents(res.data);
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  const updateStudent = async (id, student) => {
    const updatedName = prompt("Enter new name", student.name);
    if (updatedName) {
      await axios.put(`http://localhost:5000/api/students/${id}`, { ...student, name: updatedName });
      fetchStudents();
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="list">
      {students.map((s) => (
        <div className="student-card" key={s._id}>
          <p><strong>{s.name}</strong></p>
          <p>{s.email}</p>
          <p>Grade: {s.grade}</p>
          <p>Status: {s.isActive ? 'Active' : 'Inactive'}</p>
          <button className="update" onClick={() => updateStudent(s._id, s)}>Update</button>
          <button className="delete" onClick={() => deleteStudent(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ListStudent;

// src/App.js
import './App.css';
import AddStudent from './components/AddStudent';
import ListStudent from './components/ListStudent';

function App() {
  return (
    <div className="App">
      <h1>Student Management System</h1>
      <AddStudent onAdd={() => window.location.reload()} />
      <ListStudent />
    </div>
  );
}

export default App;

// src/App.css
body {
  font-family: sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.App {
  max-width: 700px;
  margin: auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  text-align: center;
}

// src/components/AddStudent.css
.form {
  margin-bottom: 2rem;
}

.form input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.form .checkbox {
  text-align: left;
  font-size: 14px;
  margin-bottom: 1rem;
}

.form button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.form button:hover {
  background-color: #218838;
}

// src/components/ListStudent.css
.list {
  margin-top: 2rem;
}

.student-card {
  background-color: #eef;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: left;
}

.student-card button {
  margin-top: 0.5rem;
  margin-right: 10px;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.student-card .update {
  background-color: #007bff;
  color: white;
}

.student-card .update:hover {
  background-color: #0056b3;
}

.student-card .delete {
  background-color: #dc3545;
  color: white;
}

.student-card .delete:hover {
  background-color: #c82333;
}

// ===================== END =====================

// To Run:
// 1. Start backend: cd backend -> npm install -> npm start
// 2. Start frontend: cd frontend -> npm install axios -> npm start
// 3. Make sure MongoDB Atlas URI is correctly set in .env file
