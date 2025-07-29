import express from 'express';
import { Pool } from 'pg';
import db from './db.js';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = 5000;

/// 192.168.200.121:5000

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGSSLMODE, PGCHANNELBINDING } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  port: 5432,
  ssl: {
    require: true,  
  }
});

app.get('/', (req, res) => {
  console.log(req.ip);
  res.send("server chala");
});

app.get('/users', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM public."user"');
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  } finally {
    client.release();
  }
});

app.listen(port, () => console.log(`server is running on port ${port}`));
