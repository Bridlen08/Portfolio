const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_change_me';

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const contactRoutes = require('./routes/contactRoutes');

// Auth Middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};



// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === adminUser && password === adminPass) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/api/auth/verify', authenticate, (req, res) => {
  res.json({ valid: true });
});

// Project Routes
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    const projects = rows.map(project => ({
      ...project,
      tech_stack: typeof project.tech_stack === 'string' ? JSON.parse(project.tech_stack) : project.tech_stack
    }));
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', authenticate, async (req, res) => {
  const { title, description, image, tech_stack, github_url, live_url } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO projects (title, description, image, tech_stack, github_url, live_url) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, image, JSON.stringify(tech_stack), github_url, live_url]
    );
    res.status(201).json({ id: result.insertId, message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, description, image, tech_stack, github_url, live_url } = req.body;
  try {
    await pool.query(
      'UPDATE projects SET title = ?, description = ?, image = ?, tech_stack = ?, github_url = ?, live_url = ? WHERE id = ?',
      [title, description, image, JSON.stringify(tech_stack), github_url, live_url, id]
    );
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Contact Routes
app.use('/api/contact', contactRoutes);

app.get('/api/contacts', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM portfolio.contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.delete('/api/contacts/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM portfolio.contacts WHERE id = ?', [id]);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});



app.listen(PORT, () => {});