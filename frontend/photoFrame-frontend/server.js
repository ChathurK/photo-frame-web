import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for image uploads
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'photoframe',
  port: parseInt(process.env.DB_PORT) || 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Database config:', { ...dbConfig, password: '***' });
  }
}

// Routes

// GET /api/orders - Get all orders with items
app.get('/api/orders', async (req, res) => {
  try {
    const [orders] = await pool.execute(`
      SELECT o.*, 
             oi.id as item_id, oi.category_id, oi.design_sample_id, oi.frame_type_id, 
             oi.size_id, oi.frame_color_id, oi.number_of_persons, oi.background_color, 
             oi.image_url, oi.notes,
             c.name as category_name, c.code as category_code,
             ds.display_name as design_sample_name,
             ft.name as frame_type_name, ft.material as frame_material,
             s.display as size_display, s.width, s.height, s.unit,
             fc.name as frame_color_name
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN categories c ON oi.category_id = c.id
      LEFT JOIN design_samples ds ON oi.design_sample_id = ds.id
      LEFT JOIN frame_types ft ON oi.frame_type_id = ft.id
      LEFT JOIN sizes s ON oi.size_id = s.id
      LEFT JOIN frame_colors fc ON oi.frame_color_id = fc.id
      ORDER BY o.created_at DESC
    `);
    
    res.json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// GET /api/orders/:id - Get order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
});

// POST /api/orders - Create new order (using your existing schema)
app.post('/api/orders', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    const {
      categoryId,
      designSampleId,
      frameTypeId,
      sizeId,
      frameColorId,
      customerName,
      customerAddress,
      customerWhatsapp,
      deliveryTo,
      deliveryDate,
      totalAmount,
      numberOfPersons,
      backgroundColor,
      imageUrl,
      notes
    } = req.body;

    // Validate required fields
    if (!categoryId || !frameTypeId || !sizeId || !customerName || !customerAddress || !customerWhatsapp) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Insert order
    const [orderResult] = await connection.execute(
      `INSERT INTO orders (customer_name, customer_address, customer_whatsapp, delivery_to, delivery_date, total_amount, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [customerName, customerAddress, customerWhatsapp, deliveryTo || customerAddress, deliveryDate || null, totalAmount || 0]
    );

    const orderId = orderResult.insertId;

    // Insert order item (convert undefined to null for MySQL)
    await connection.execute(
      `INSERT INTO order_items (order_id, category_id, design_sample_id, frame_type_id, size_id, frame_color_id, number_of_persons, background_color, image_url, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId, 
        categoryId, 
        designSampleId || null, 
        frameTypeId, 
        sizeId, 
        frameColorId || null, 
        numberOfPersons || 1, 
        backgroundColor || null, 
        imageUrl || null, 
        notes || null
      ]
    );

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        id: orderId,
        status: 'CREATED'
      }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// PUT /api/orders/:id/status - Update order status
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const validStatuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Valid statuses: ' + validStatuses.join(', ')
      });
    }

    const [result] = await pool.execute(
      'UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?',
      [status.toUpperCase(), id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
});

// DELETE /api/orders/:id - Delete order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.execute(
      'DELETE FROM orders WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete order',
      error: error.message
    });
  }
});

// GET /api/categories - Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    console.log('🔄 Fetching categories...');
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY name');
    console.log('✅ Categories fetched:', rows.length, 'items');
    console.log('Categories data:', rows);
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    console.error('Error details:', {
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage || error.message
    });
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
});

// GET /api/design-samples/:categoryId - Get design samples for category
app.get('/api/design-samples/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const [rows] = await pool.execute(
      'SELECT * FROM design_samples WHERE category_id = ? ORDER BY display_name',
      [categoryId]
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching design samples:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch design samples',
      error: error.message
    });
  }
});

// GET /api/frame-types/:categoryId - Get frame types for category
app.get('/api/frame-types/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const [rows] = await pool.execute(
      'SELECT * FROM frame_types WHERE category_id = ? ORDER BY name',
      [categoryId]
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching frame types:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch frame types',
      error: error.message
    });
  }
});

// GET /api/sizes/:frameTypeId - Get available sizes for frame type
app.get('/api/sizes/:frameTypeId', async (req, res) => {
  try {
    const { frameTypeId } = req.params;
    const [rows] = await pool.execute(
      `SELECT s.* FROM sizes s 
       JOIN frame_type_sizes fts ON s.id = fts.size_id 
       WHERE fts.frame_type_id = ? 
       ORDER BY s.width * s.height`,
      [frameTypeId]
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching sizes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sizes',
      error: error.message
    });
  }
});

// GET /api/frame-colors/:frameTypeId - Get colors for frame type
app.get('/api/frame-colors/:frameTypeId', async (req, res) => {
  try {
    const { frameTypeId } = req.params;
    const [rows] = await pool.execute(
      'SELECT * FROM frame_colors WHERE frame_type_id = ? ORDER BY name',
      [frameTypeId]
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching frame colors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch frame colors',
      error: error.message
    });
  }
});

// GET /api/customers - Get all customers
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM customers ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  await testConnection();
});

export default app;