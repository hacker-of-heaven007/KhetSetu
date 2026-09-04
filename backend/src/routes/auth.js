import express from 'express';
import bcrypt from 'bcryptjs';
import { getDB, saveDB } from '../config/db.js';
import { generateToken, requireAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new Farmer or Buyer
 */
router.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password, role, village, district, state, businessName, buyerType, location } = req.body;

    if (!name || !phone || !password || !role) {
      return res.status(400).json({ error: 'Please provide name, phone, password and role (FARMER or BUYER).' });
    }

    const db = getDB();

    // Check if user already exists with same phone or email
    const existing = db.users.find(u => u.phone === phone || (email && u.email === email));
    if (existing) {
      return res.status(400).json({ error: 'An account with this phone number or email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: `${role.toLowerCase()}-${Date.now()}`,
      name,
      phone,
      email: email || '',
      role: role.toUpperCase(),
      passwordHash,
      village: village || '',
      district: district || '',
      state: state || 'West Bengal',
      businessName: businessName || '',
      buyerType: buyerType || 'Retailer',
      location: location || village || 'West Bengal',
      verified: true,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    saveDB(db);

    const token = generateToken(newUser);

    // Exclude passwordHash in response
    const { passwordHash: _, ...safeUser } = newUser;

    return res.status(201).json({
      message: 'Account registered successfully!',
      user: safeUser,
      token
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Server error during registration.' });
  }
});

/**
 * POST /api/auth/login
 * Log in using Phone/Email + Password
 */
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be phone or email

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Please enter your phone number / email and password.' });
    }

    const db = getDB();
    const user = db.users.find(u => u.phone === identifier || (u.email && u.email.toLowerCase() === identifier.toLowerCase()));

    if (!user) {
      return res.status(404).json({ error: 'No account found with this phone/email. Please register.' });
    }

    // Check default demo password fallback or bcrypt compare
    let isMatch = false;
    if (password === 'password123' || password === 'demo123') {
      isMatch = true;
    } else {
      isMatch = await bcrypt.compare(password, user.passwordHash);
    }

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password. Try "password123" for demo accounts.' });
    }

    const token = generateToken(user);
    const { passwordHash: _, ...safeUser } = user;

    return res.json({
      message: 'Logged in successfully!',
      user: safeUser,
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login.' });
  }
});

/**
 * GET /api/auth/me
 * Fetch logged in user profile
 */
router.get('/me', requireAuth, (req, res) => {
  try {
    const db = getDB();
    const user = db.users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const { passwordHash: _, ...safeUser } = user;
    return res.json({ user: safeUser });
  } catch (err) {
    return res.status(500).json({ error: 'Server error fetching user.' });
  }
});

/**
 * GET /api/auth/users
 * List registered farmers and buyers
 */
router.get('/users', (req, res) => {
  try {
    const db = getDB();
    const safeUsers = db.users.map(({ passwordHash, ...rest }) => rest);
    return res.json({ users: safeUsers });
  } catch (err) {
    return res.status(500).json({ error: 'Server error listing users.' });
  }
});

export default router;
