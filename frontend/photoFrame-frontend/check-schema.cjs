const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'photoframe',
  port: process.env.DB_PORT || 3307,
};

async function checkTableStructure() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database');
    
    // Check orders table structure
    console.log('\n📋 ORDERS table structure:');
    const [orderColumns] = await connection.execute('DESCRIBE orders');
    orderColumns.forEach(col => {
      console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'YES' ? '(nullable)' : '(required)'}`);
    });
    
    // Check order_items table structure  
    console.log('\n📋 ORDER_ITEMS table structure:');
    const [itemColumns] = await connection.execute('DESCRIBE order_items');
    itemColumns.forEach(col => {
      console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'YES' ? '(nullable)' : '(required)'}`);
    });
    
    console.log('\n🔍 Checking for image_url column type:');
    const [imageCol] = await connection.execute(
      "SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'photoframe' AND TABLE_NAME = 'order_items' AND COLUMN_NAME = 'image_url'"
    );
    console.log('image_url column info:', imageCol);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkTableStructure();