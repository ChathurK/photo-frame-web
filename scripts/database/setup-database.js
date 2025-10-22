import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT) || 3306,
  multipleStatements: true
};

async function setupDatabase() {
  let connection;
  
  try {
    console.log('🔧 Setting up photo frame database...\n');
    console.log('📡 Connecting to MySQL server...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected successfully!\n');
    
    // Read the schema file
    const schemaPath = join(__dirname, '..', '..', 'database', 'schema', 'updated_schema.sql');
    console.log('📖 Reading schema from:', schemaPath);
    const schemaSQL = readFileSync(schemaPath, 'utf8');
    
    // Execute the schema
    console.log('🏗️  Creating database and tables...\n');
    await connection.query(schemaSQL);
    console.log('✅ Database schema applied successfully!\n');
    
    // Switch to the photo database
    await connection.changeUser({ database: 'photo' });
    
    // Verify tables were created
    console.log('🔍 Verifying tables...\n');
    const [tables] = await connection.execute('SHOW TABLES');
    
    console.log('📋 Tables created:');
    for (const table of tables) {
      const tableName = table['Tables_in_photo'];
      console.log(`  ✓ ${tableName}`);
      
      // For order_items, specifically check for package_type column
      if (tableName === 'order_items') {
        const [columns] = await connection.execute(`DESCRIBE ${tableName}`);
        const hasPackageType = columns.some(col => col.Field === 'package_type');
        if (hasPackageType) {
          console.log('    ✓ package_type column present');
        } else {
          console.log('    ⚠️  package_type column missing - adding it now...');
          await connection.execute(`
            ALTER TABLE order_items 
            ADD COLUMN package_type VARCHAR(20) DEFAULT 'free' 
            COMMENT 'Package type: free or premium (+Rs. 450)'
          `);
          console.log('    ✓ package_type column added');
        }
      }
    }
    
    // Check data counts
    console.log('\n📊 Data verification:');
    const [categories] = await connection.execute('SELECT COUNT(*) as count FROM categories');
    console.log(`  ✓ Categories: ${categories[0].count}`);
    
    const [frameTypes] = await connection.execute('SELECT COUNT(*) as count FROM frame_types');
    console.log(`  ✓ Frame Types: ${frameTypes[0].count}`);
    
    const [sizes] = await connection.execute('SELECT COUNT(*) as count FROM sizes');
    console.log(`  ✓ Sizes: ${sizes[0].count}`);
    
    const [framePrices] = await connection.execute('SELECT COUNT(*) as count FROM frame_prices');
    console.log(`  ✓ Frame Prices: ${framePrices[0].count}`);
    
    console.log('\n🎉 Database setup complete! Your photo frame website is ready to accept orders.');
    
  } catch (error) {
    console.error('\n❌ Setup failed:');
    console.error('Error:', error.message);
    console.error('\nStack:', error.stack);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed.');
    }
  }
}

setupDatabase();
