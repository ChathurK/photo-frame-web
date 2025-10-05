import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT) || 3306
};

async function checkDatabase() {
  let connection;
  
  try {
    console.log('🔍 Connecting to MySQL server...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL server successfully!');
    
    // List all databases
    console.log('\n📁 Available databases:');
    const [databases] = await connection.execute('SHOW DATABASES');
    databases.forEach(db => {
      console.log(`  - ${db.Database}`);
    });
    
    // Check if our target database exists
    const targetDb = process.env.DB_NAME || 'photoframe_db';
    console.log(`\n🎯 Checking for database: ${targetDb}`);
    
    const dbExists = databases.some(db => db.Database === targetDb);
    
    if (dbExists) {
      console.log(`✅ Database '${targetDb}' exists!`);
      
      // Connect to the specific database
      await connection.changeUser({ database: targetDb });
      
      // List all tables
      console.log(`\n📋 Tables in '${targetDb}':`);
      const [tables] = await connection.execute('SHOW TABLES');
      
      if (tables.length === 0) {
        console.log('  No tables found.');
      } else {
        for (const table of tables) {
          const tableName = table[`Tables_in_${targetDb}`];
          console.log(`\n  📄 Table: ${tableName}`);
          
          // Show table structure
          const [columns] = await connection.execute(`DESCRIBE ${tableName}`);
          columns.forEach(col => {
            console.log(`    - ${col.Field}: ${col.Type} ${col.Null === 'NO' ? '(NOT NULL)' : ''} ${col.Key === 'PRI' ? '(PRIMARY KEY)' : ''}`);
          });
        }
      }
    } else {
      console.log(`❌ Database '${targetDb}' does not exist.`);
      console.log('\n🔧 Would you like to create it? Update your .env file with the correct database name or create the database first.');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    console.error('\n🔧 Please check your database credentials in the .env file:');
    console.error('- DB_HOST:', process.env.DB_HOST || 'localhost');
    console.error('- DB_USER:', process.env.DB_USER || 'root');
    console.error('- DB_NAME:', process.env.DB_NAME || 'photoframe_db');
    console.error('- DB_PORT:', process.env.DB_PORT || 3306);
    console.error('- DB_PASSWORD: [hidden]');
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed.');
    }
  }
}

checkDatabase();