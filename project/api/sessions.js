
const fs = require('fs');
const path = require('path');
const DB = path.join(__dirname, '..', 'db.json');
function readDB(){ return JSON.parse(fs.readFileSync(DB)); }
function writeDB(j){ fs.writeFileSync(DB, JSON.stringify(j, null, 2)); }

module.exports = (req, res) => {
  const db = readDB();
  if (req.method === 'GET') return res.json({ sessions: db.sessions });
  if (req.method === 'POST') {
    let body='';
    req.on('data', c=>body+=c);
    req.on('end', ()=> {
      try{
        const s = JSON.parse(body || '{}');
        s.id = (db.sessions.reduce((m, it)=> Math.max(m, it.id||0),0) || 0) + 1;
        db.sessions.push(s);
        writeDB(db);
        res.status(201).json({ session: s });
      }catch(e){
        res.status(400).json({ error: e.message });
      }
    });
    return;
  }
  res.status(405).json({ error: 'Method not allowed' });
};
