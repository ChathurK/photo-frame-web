import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'photo',
  port: parseInt(process.env.DB_PORT) || 3306
};

async function addPackageTypeColumn() {
  let connection;
  
  try {
    console.log('🔧 Adding package_type column to order_items table...\n');
    console.log('📡 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected successfully!\n');
    
    // Check if column already exists
    const [columns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'photo' 
      AND TABLE_NAME = 'order_items' 
      AND COLUMN_NAME = 'package_type'
    `);
    
    if (columns.length > 0) {
      console.log('ℹ️  Column package_type already exists in order_items table.');
      console.log('✅ No migration needed!\n');
    } else {
      console.log('➕ Adding package_type column...');
      await connection.execute(`
        ALTER TABLE order_items 
        ADD COLUMN package_type VARCHAR(20) DEFAULT 'free' 
        COMMENT 'Package type: free or premium (+Rs. 450)'
      `);
      console.log('✅ Column added successfully!\n');
      
      // Update existing records
      console.log('🔄 Updating existing records to default value...');
      await connection.execute(`
        UPDATE order_items 
        SET package_type = 'free' 
        WHERE package_type IS NULL
      `);
      console.log('✅ Existing records updated!\n');
    }
    
    // Verify the change
    console.log('🔍 Verifying changes...');
    const [tableInfo] = await connection.execute('DESCRIBE order_items');
    const packageTypeColumn = tableInfo.find(col => col.Field === 'package_type');
    
    if (packageTypeColumn) {
      console.log('✅ Verification successful!');
      console.log('   Column details:');
      console.log(`   - Field: ${packageTypeColumn.Field}`);
      console.log(`   - Type: ${packageTypeColumn.Type}`);
      console.log(`   - Default: ${packageTypeColumn.Default}`);
      console.log(`   - Null: ${packageTypeColumn.Null}`);
    }
    
    console.log('\n🎉 Migration complete!');
    
  } catch (error) {
    console.error('\n❌ Migration failed:');
    console.error('Error:', error.message);
    
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error('\n⚠️  The order_items table does not exist!');
      console.error('   Please run the full database setup first:');
      console.error('   node scripts/database/setup-database.js');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed.');
    }
  }
}

addPackageTypeColumn();
