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

async function createOrderTables() {
  let connection;
  
  try {
    console.log('🏗️  Creating orders and order_items tables...\n');
    console.log('📡 Connecting to database "photo"...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected successfully!\n');
    
    // Create orders table
    console.log('📋 Creating orders table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(200) NOT NULL,
        customer_address TEXT,
        customer_whatsapp VARCHAR(50),
        delivery_to VARCHAR(50) NOT NULL,
        delivery_date DATE,
        total_amount DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ orders table created!\n');
    
    // Create order_items table
    console.log('📋 Creating order_items table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        category_id INT NOT NULL,
        design_sample_id INT,
        frame_type_id INT NOT NULL,
        size_id INT NOT NULL,
        frame_color_id INT,
        number_of_persons INT DEFAULT 1,
        background_color VARCHAR(100),
        package_type VARCHAR(20) DEFAULT 'free',
        notes TEXT,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (category_id) REFERENCES categories(id),
        FOREIGN KEY (design_sample_id) REFERENCES design_samples(id),
        FOREIGN KEY (frame_type_id) REFERENCES frame_types(id),
        FOREIGN KEY (size_id) REFERENCES sizes(id),
        FOREIGN KEY (frame_color_id) REFERENCES frame_colors(id)
      )
    `);
    console.log('✅ order_items table created with package_type column!\n');
    
    // Verify tables
    console.log('🔍 Verifying tables...\n');
    
    const [ordersCols] = await connection.execute('DESCRIBE orders');
    console.log('📄 orders table columns:');
    ordersCols.forEach(col => {
      console.log(`   - ${col.Field}: ${col.Type}`);
    });
    
    console.log('\n📄 order_items table columns:');
    const [orderItemsCols] = await connection.execute('DESCRIBE order_items');
    orderItemsCols.forEach(col => {
      console.log(`   - ${col.Field}: ${col.Type}`);
    });
    
    // Check for package_type specifically
    const hasPackageType = orderItemsCols.some(col => col.Field === 'package_type');
    if (hasPackageType) {
      console.log('\n✅ package_type column is present with default value "free"');
    }
    
    console.log('\n🎉 Order tables created successfully!');
    console.log('📦 Your photo frame website can now accept orders!\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n⚠️  Database "photo" does not exist!');
      console.error('   Create it first or check your DB_NAME in .env');
    } else if (error.code === 'ER_TABLE_EXISTS_ERROR') {
      console.log('\nℹ️  Tables already exist. Checking structure...');
      
      // Check if package_type exists
      const [cols] = await connection.execute('DESCRIBE order_items');
      const hasPackageType = cols.some(col => col.Field === 'package_type');
      
      if (!hasPackageType) {
        console.log('\n⚠️  package_type column missing! Adding it now...');
        await connection.execute(`
          ALTER TABLE order_items 
          ADD COLUMN package_type VARCHAR(20) DEFAULT 'free' 
          COMMENT 'Package type: free or premium (+Rs. 450)'
        `);
        console.log('✅ package_type column added!');
      } else {
        console.log('✅ All columns including package_type are present!');
      }
    }
    
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Connection closed.');
    }
  }
}

createOrderTables();
