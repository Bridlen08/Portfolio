-- Create database
CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;

-- Projects table
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
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample projects
INSERT INTO projects (title, description, image, tech_stack, github_url, live_url) VALUES
('E-Commerce Platform', 'A full-stack e-commerce solution with React, Node.js, and MySQL', '/images/ecommerce.jpg', '["React", "Node.js", "MySQL", "Stripe"]', 'https://github.com/username/ecommerce', 'https://ecommerce-demo.com'),
('Task Management App', 'A collaborative task management application with real-time updates', '/images/taskapp.jpg', '["Vue.js", "Express", "MongoDB", "Socket.io"]', 'https://github.com/username/taskapp', 'https://taskapp-demo.com'),
('Weather Dashboard', 'A responsive weather dashboard with location-based forecasts', '/images/weather.jpg', '["React", "OpenWeather API", "Chart.js"]', 'https://github.com/username/weather', 'https://weather-demo.com'),
('Portfolio Website', 'A modern portfolio website with interactive animations', '/images/portfolio.jpg', '["React", "Framer Motion", "Tailwind CSS"]', 'https://github.com/username/portfolio', 'https://portfolio-demo.com');