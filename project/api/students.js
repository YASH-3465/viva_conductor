
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');
function readDB(){ return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')); }
function writeDB(j){ fs.writeFileSync(DB_PATH, JSON.stringify(j, null, 2)); }

export default (req, res) => {
  const db = readDB();
  if (req.method === 'GET') {
    return res.json({ students: db.students });
  }
  if (req.method === 'POST') {
    let body='';
    req.on('data', c=>body+=c);
    req.on('end', ()=> {
      try{
        const s = JSON.parse(body || '{}');
        s.id = (db.students.reduce((m, it)=> Math.max(m, it.id||0),0) || 0) + 1;
        db.students.push(s);
        writeDB(db);
        res.status(201).json({ student: s });
      }catch(e){
        res.status(400).json({ error: e.message });
      }
    });
    return;
  }
  res.status(405).json({ error: 'Method not allowed' });
};
