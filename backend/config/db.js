const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root@1234',
};

const poolConfig = {
    ...dbConfig,
    database: 'portfolio',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;

async function initDB() {
    try {
        // Connect without a specific db constraint to create it
        const connection = await mysql.createConnection(dbConfig);
        await connection.query('CREATE DATABASE IF NOT EXISTS portfolio;');
        await connection.query('USE portfolio;');
        
        await connection.query(`
          CREATE TABLE IF NOT EXISTS projects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            image VARCHAR(500),
            tech_stack JSON,
            github_url VARCHAR(500),
            live_url VARCHAR(500),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )
        `);

        await connection.query(`
          CREATE TABLE IF NOT EXISTS contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Insert sample projects if table is empty
        const [projects] = await connection.query('SELECT COUNT(*) as count FROM projects');
        if (projects[0].count === 0) {
          await connection.query(`
            INSERT INTO projects (title, description, image, tech_stack, github_url, live_url) VALUES
            ('E-Commerce Platform', 'A full-stack e-commerce solution with React, Node.js, and MySQL', '/assets/placeholder.svg', '["React", "Node.js", "MySQL", "Stripe"]', 'https://github.com/Bridlen08/ecommerce', 'https://ecommerce-demo.com'),
            ('Task Management App', 'A collaborative task management application with real-time updates', '/assets/placeholder.svg', '["Vue.js", "Express", "MongoDB", "Socket.io"]', 'https://github.com/Bridlen08/taskapp', 'https://taskapp-demo.com'),
            ('Weather Dashboard', 'A responsive weather dashboard with location-based forecasts', '/assets/placeholder.svg', '["React", "OpenWeather API", "Chart.js"]', 'https://github.com/Bridlen08/weather', 'https://weather-demo.com'),
            ('Portfolio Website', 'A modern portfolio website with interactive animations', '/assets/placeholder.svg', '["React", "Framer Motion", "Tailwind CSS"]', 'https://github.com/Bridlen08/portfolio', 'https://portfolio-demo.com')
          `);
          console.log('✅ Sample projects inserted.');
        }

        console.log('✅ Database portfolio initialized successfully.');
        await connection.end();
    } catch (e) {
        console.error('❌ Failed to initialize database on startup:', e.message);
    }
}

// Fire Once
initDB();

pool = mysql.createPool(poolConfig);

module.exports = pool;
