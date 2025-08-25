
const fs = require('fs');
const path = require('path');
const DB = path.join(__dirname, '..', 'db.json');
function readDB(){ return JSON.parse(fs.readFileSync(DB)); }
function writeDB(j){ fs.writeFileSync(DB, JSON.stringify(j, null, 2)); }

module.exports = (req, res) => {
  const db = readDB();
  if (req.method === 'GET') return res.json({ results: db.results });
  if (req.method === 'POST') {
    let body='';
    req.on('data', c=>body+=c);
    req.on('end', ()=> {
      try{
        const r = JSON.parse(body || '{}');
        r.id = (db.results.reduce((m, it)=> Math.max(m, it.id||0),0) || 0) + 1;
        db.results.push(r);
        writeDB(db);
        res.status(201).json({ result: r });
      }catch(e){
        res.status(400).json({ error: e.message });
      }
    });
    return;
  }
  res.status(405).json({ error: 'Method not allowed' });
};
