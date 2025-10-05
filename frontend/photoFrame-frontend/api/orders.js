import mysql from 'mysql2/promise';

// Database configuration
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'photoframe_db',
  port: parseInt(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool(DB_CONFIG);
  }
  return pool;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const connection = getPool();

  try {
    if (req.method === 'POST') {
      // Create new order
      const {
        category,
        size,
        frameType,
        frameColor,
        quantity,
        customerName,
        email,
        phone,
        address,
        city,
        totalAmount,
        specialInstructions
      } = req.body;

      const orderId = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5);
      
      const sql = `
        INSERT INTO orders (
          id, category, size, frame_type, frame_color, quantity,
          customer_name, email, phone, address, city,
          total_amount, status, created_at, special_instructions
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        orderId,
        category,
        size,
        frameType,
        frameColor,
        quantity,
        customerName,
        email,
        phone,
        address,
        city,
        totalAmount,
        'pending',
        new Date(),
        specialInstructions || null
      ];

      await connection.execute(sql, values);

      res.status(201).json({
        success: true,
        orderId,
        message: 'Order created successfully'
      });

    } else if (req.method === 'GET') {
      // Get all orders
      const [rows] = await connection.execute(
        'SELECT * FROM orders ORDER BY created_at DESC'
      );

      res.status(200).json({
        success: true,
        orders: rows
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Database error occurred',
      error: error.message
    });
  }
}