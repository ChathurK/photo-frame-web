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

async function checkTables() {
  let connection;
  
  try {
    console.log('🔍 Checking database tables...\n');
    console.log('📡 Connecting to database "photo"...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected successfully!\n');
    
    // List all tables
    console.log('📋 Tables in database:');
    const [tables] = await connection.execute('SHOW TABLES');
    
    if (tables.length === 0) {
      console.log('  ❌ No tables found!');
      console.log('\n⚠️  You need to run the database setup first.');
      console.log('   Run: node check-and-setup.js');
      return;
    }
    
    for (const table of tables) {
      const tableName = table['Tables_in_photo'];
      console.log(`\n  📄 ${tableName}:`);
      
      // Show table structure
      const [columns] = await connection.execute(`DESCRIBE ${tableName}`);
      columns.forEach(col => {
        const keyInfo = col.Key === 'PRI' ? '🔑 PRIMARY KEY' : col.Key === 'MUL' ? '🔗 FOREIGN KEY' : '';
        console.log(`     - ${col.Field}: ${col.Type} ${col.Null === 'NO' ? '(NOT NULL)' : '(NULL)'} ${col.Default !== null ? `DEFAULT '${col.Default}'` : ''} ${keyInfo}`);
      });
      
      // Count rows
      const [count] = await connection.execute(`SELECT COUNT(*) as count FROM ${tableName}`);
      console.log(`     📊 Rows: ${count[0].count}`);
    }
    
    // Check specifically for order_items and package_type
    console.log('\n\n🔍 Checking for package_type column in order_items...');
    const [orderItemsColumns] = await connection.execute(`DESCRIBE order_items`);
    const hasPackageType = orderItemsColumns.some(col => col.Field === 'package_type');
    
    if (hasPackageType) {
      console.log('✅ package_type column EXISTS in order_items table!');
    } else {
      console.log('❌ package_type column MISSING from order_items table!');
      console.log('\n⚠️  Run migration to add it:');
      console.log('   node add-package-type-migration.js');
    }
    
  } catch (error) {
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n❌ Database "photo" does not exist!');
      console.error('\n⚠️  You need to create the database first.');
      console.error('   Run: node setup-database-full.js');
    } else if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error('\n❌ Tables do not exist!');
      console.error('\n⚠️  You need to run the database setup first.');
      console.error('   Run: node setup-database-full.js');
    } else {
      console.error('\n❌ Error:', error.message);
      console.error('\nDatabase config:');
      console.error('- Host:', dbConfig.host);
      console.error('- User:', dbConfig.user);
      console.error('- Database:', dbConfig.database);
      console.error('- Port:', dbConfig.port);
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n\n🔌 Connection closed.');
    }
  }
}

checkTables();
