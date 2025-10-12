const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'photoframe',
  port: process.env.DB_PORT || 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

console.log('Database config:', { ...dbConfig, password: '***' });

async function testCategories() {
  let connection;
  try {
    console.log('Creating connection...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database');
    
    console.log('Executing query: SELECT * FROM categories ORDER BY name');
    const [rows] = await connection.execute('SELECT * FROM categories ORDER BY name');
    console.log('✅ Query executed successfully');
    console.log('Categories found:', rows.length);
    console.log('Categories data:', rows);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Error code:', error.code);
    console.error('Error errno:', error.errno);
    console.error('SQL Message:', error.sqlMessage);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Connection closed');
    }
  }
}

testCategories();