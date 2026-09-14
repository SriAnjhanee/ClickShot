import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, testConnection } from './db.js';
import { hashPassword, comparePassword, signToken, sanitizeUser } from './auth.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL,
      shoot_type VARCHAR(255) NOT NULL,
      event_date DATE,
      venue VARCHAR(255) NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@clickshot.local';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

  const [existingAdmin] = await pool.query('SELECT id FROM users WHERE email = ?', [adminEmail]);
  if (!existingAdmin.length) {
    const passwordHash = await hashPassword(adminPassword);
    await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', ['Admin', adminEmail, passwordHash]);
    console.log(`Default admin created for ${adminEmail}`);
  }
}

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, message: 'ClickShot API is running' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Database unavailable' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }

  try {
    const passwordHash = await hashPassword(password);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );

    const user = { id: result.insertId, name, email };
    res.status(201).json({
      token: signToken(user),
      user: sanitizeUser(user),
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }
    console.error('Register error:', error);
    res.status(500).json({ message: 'Registration failed.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.json({
      token: signToken(user),
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed.' });
  }
});

app.post('/api/bookings', async (req, res) => {
  const {
    fullName,
    phone,
    email,
    shootType,
    eventDate,
    venue,
    message,
  } = req.body || {};

  if (!fullName || !phone || !email || !shootType || !venue) {
    return res.status(400).json({ message: 'Missing required booking fields.' });
  }

  try {
    await pool.query(
      `INSERT INTO bookings (full_name, phone, email, shoot_type, event_date, venue, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [fullName, phone, email, shootType, eventDate || null, venue, message || '']
    );

    res.status(201).json({ ok: true, message: 'Booking saved successfully.' });
  } catch (error) {
    console.error('Booking save error:', error);
    res.status(500).json({ message: 'Booking could not be saved.' });
  }
});

async function startServer() {
  await testConnection();
  await ensureSchema();

  app.listen(port, () => {
    console.log(`ClickShot API running on http://localhost:${port}`);
  });
}

startServer();
