
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');
function readDB(){ return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')); }
function writeDB(j){ fs.writeFileSync(DB_PATH, JSON.stringify(j, null, 2)); }

export default (req, res) => {
  // Only POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      const { email, password } = JSON.parse(body || '{}');
      const db = readDB();
      const user = db.users.find(u => u.email === email && u.password === password);
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      // Simple token (not secure) — consumer may replace with real JWT
      const token = Buffer.from(JSON.stringify({ id: user.id, email: user.email, type: user.type })).toString('base64');
      res.json({ user: { id: user.id, name: user.name, email: user.email, type: user.type }, token });
    } catch (e) {
      res.status(400).json({ error: 'Bad request', details: e.message });
    }
  });
};
