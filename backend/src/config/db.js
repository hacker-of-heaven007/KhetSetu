import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed store
const initialData = {
  users: [
    {
      id: 'farmer-1',
      name: 'Ramesh Mondal',
      phone: '9830124589',
      email: 'ramesh@khetsetu.in',
      role: 'FARMER',
      village: 'Nabapally, Barasat',
      district: 'North 24 Parganas',
      state: 'West Bengal',
      passwordHash: '$2a$10$8g4kKz8Mv1YVd5Kx8Fj3s.m6Z7h8j9k0l1m2n3o4p5q6r7s8t9u0v', // password: password123
      verified: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'buyer-1',
      name: 'FreshMart Procurement Hub',
      businessName: 'FreshMart Superstores',
      phone: '9830011223',
      email: 'procure@freshmart.com',
      role: 'BUYER',
      buyerType: 'Retailer',
      location: 'Kolkata Wholesale Terminal, Ultadanga',
      passwordHash: '$2a$10$8g4kKz8Mv1YVd5Kx8Fj3s.m6Z7h8j9k0l1m2n3o4p5q6r7s8t9u0v', // password: password123
      verified: true,
      createdAt: new Date().toISOString()
    }
  ],
  produce: [],
  demands: [],
  orders: []
};

// Initialize DB file if not exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
}

export const getDB = () => {
  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading DB file, returning initial data', err);
    return initialData;
  }
};

export const saveDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing DB file', err);
    return false;
  }
};
