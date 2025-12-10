import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

const __dirname = path.resolve();
const DB_PATH = path.join(__dirname, 'applications.json');
const ADMIN_PASS = '301062Ki';

const app = express();
// Allow CORS from any origin (for dev). Explicitly allow custom header 'x-admin-pass'.
app.use(cors({ origin: true, methods: ['GET','POST','PATCH','OPTIONS'], allowedHeaders: ['Content-Type','x-admin-pass'] }));
app.use(express.json());
app.use(morgan('dev'));

async function readDB() {
  try {
    const txt = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(txt || '[]');
  } catch (err) {
    return [];
  }
}

async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

app.post('/api/applications', async (req, res) => {
  const { name, phone, direction } = req.body || {};
  if (!name || !phone) return res.status(400).json({ error: 'name and phone required' });

  const db = await readDB();
  const entry = {
    id: Date.now().toString(),
    name,
    phone,
    direction: direction || '',
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  db.unshift(entry);
  await writeDB(db);
  res.status(201).json(entry);
});

function checkAdmin(req, res, next) {
  const pass = req.headers['x-admin-pass'];
  if (!pass || pass !== ADMIN_PASS) return res.status(401).json({ error: 'unauthorized' });
  next();
}

app.get('/api/applications', checkAdmin, async (req, res) => {
  const db = await readDB();
  res.json(db);
});

app.patch('/api/applications/:id', checkAdmin, async (req, res) => {
  const { id } = req.params;
  const updates = req.body || {};
  const db = await readDB();
  const idx = db.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  db[idx] = { ...db[idx], ...updates };
  await writeDB(db);
  res.json(db[idx]);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
