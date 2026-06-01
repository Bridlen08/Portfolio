const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

async function setup() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root@1234'
  });

  try {
    await connection.query('CREATE DATABASE IF NOT EXISTS portfolio');
    console.log('✅ Database created or exists');
    
    await connection.query('USE portfolio');
    
    const schema = fs.readFileSync('schema.sql', 'utf8');
    const statements = schema.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }
    console.log('✅ Schema imported successfully');
  } catch (err) {
    console.error('❌ Setup failed:', err);
  } finally {
    await connection.end();
  }
}

setup();
