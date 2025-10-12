const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'photoframe',
  port: process.env.DB_PORT || 3307,
};

async function addDeliveryDateColumn() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database');
    
    console.log('🔧 Adding delivery_date column to orders table...');
    
    // Add delivery_date column to orders table
    await connection.execute(
      'ALTER TABLE orders ADD COLUMN delivery_date DATE NULL AFTER customer_whatsapp'
    );
    
    console.log('✅ Successfully added delivery_date column to orders table');
    
    // Verify the change
    const [columns] = await connection.execute('DESCRIBE orders');
    console.log('✅ Updated orders table structure:');
    columns.forEach(col => {
      console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'YES' ? '(nullable)' : '(required)'}`);
    });
    
  } catch (error) {
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log('ℹ️ delivery_date column already exists');
    } else {
      console.error('❌ Error:', error.message);
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addDeliveryDateColumn();