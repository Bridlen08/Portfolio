const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
  try {
    // Connect without specifying database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root@1234',
    });

    console.log('Connected to MySQL server. Creating database if needed...');
    await connection.query('CREATE DATABASE IF NOT EXISTS portfolio_contacts;');
    
    // Switch to the newly created database
    await connection.query('USE portfolio_contacts;');
    
    console.log('Creating messages table...');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        file_path VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await connection.query(createTableQuery);

    console.log('✅ Database portfolio_contacts and table messages created successfully!');
    await connection.end();
  } catch (error) {
    console.error('❌ Failed to initialize database:', error.message);
  }
}

initializeDatabase();
