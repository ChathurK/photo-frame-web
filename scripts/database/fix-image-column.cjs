/**
 * DEPRECATED: This script is no longer needed.
 * The image_url column has been removed from the order_items table.
 * Image upload functionality has been removed from the application.
 * See: database/migrations/remove-image-url-column.sql
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',  
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'photoframe',
  port: process.env.DB_PORT || 3307,
};

async function fixImageColumn() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database');
    
    console.log('🔧 Updating image_url column to handle large base64 images...');
    
    // Change image_url from VARCHAR(255) to LONGTEXT to handle base64 images
    await connection.execute(
      'ALTER TABLE order_items MODIFY COLUMN image_url LONGTEXT'
    );
    
    console.log('✅ Successfully updated image_url column to LONGTEXT');
    
    // Verify the change
    const [imageCol] = await connection.execute(
      "SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'photoframe' AND TABLE_NAME = 'order_items' AND COLUMN_NAME = 'image_url'"
    );
    console.log('✅ Updated image_url column info:', imageCol);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixImageColumn();