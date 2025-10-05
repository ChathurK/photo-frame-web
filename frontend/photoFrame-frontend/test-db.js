import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const testDatabase = async () => {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'photoframe',
    port: parseInt(process.env.DB_PORT) || 3307,
  };

  console.log('Testing database connection with config:', {
    ...dbConfig,
    password: '***'
  });

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connection successful');

    // Test if categories table exists
    const [tables] = await connection.execute("SHOW TABLES LIKE 'categories'");
    console.log('Categories table exists:', tables.length > 0);

    if (tables.length > 0) {
      const [categories] = await connection.execute('SELECT * FROM categories LIMIT 5');
      console.log('Sample categories:', categories);
    }

    // Test if orders table exists
    const [orderTables] = await connection.execute("SHOW TABLES LIKE 'orders'");
    console.log('Orders table exists:', orderTables.length > 0);

    await connection.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
};

testDatabase();