import { pool } from '../config/database.js';

// Get all orders with items
export const getAllOrders = async (req, res) => {
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
};

// Get order by ID
export const getOrderById = async (req, res) => {
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
};

// Create new order
export const createOrder = async (req, res) => {
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
};

// Update order status
export const updateOrderStatus = async (req, res) => {
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
};

// Delete order
export const deleteOrder = async (req, res) => {
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
};
