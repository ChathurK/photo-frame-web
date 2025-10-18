import { pool } from '../config/database.js';

// Get all categories
export const getAllCategories = async (req, res) => {
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
};

// Get design samples for category
export const getDesignSamples = async (req, res) => {
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
};

// Get frame types for category
export const getFrameTypes = async (req, res) => {
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
};

// Get available sizes for frame type
export const getSizes = async (req, res) => {
  try {
    const { frameTypeId } = req.params;
    console.log('🔄 Fetching sizes for frame type:', frameTypeId);
    
    // Get sizes that have prices defined for this frame type
    const [rows] = await pool.execute(
      `SELECT DISTINCT s.* 
       FROM sizes s 
       JOIN frame_prices fp ON s.id = fp.size_id 
       WHERE fp.frame_type_id = ? 
       ORDER BY s.width * s.height`,
      [frameTypeId]
    );
    
    console.log('✅ Sizes fetched:', rows.length, 'items');
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('❌ Error fetching sizes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sizes',
      error: error.message
    });
  }
};

// Get colors for frame type
export const getFrameColors = async (req, res) => {
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
};

// Get all customers
export const getAllCustomers = async (req, res) => {
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
};

// Get price for frame type and size combination
export const getPrice = async (req, res) => {
  try {
    const { frameTypeId, sizeId } = req.params;
    
    console.log('🔄 Fetching price for frame:', frameTypeId, 'size:', sizeId);
    
    // Get price from frame_prices and category increment
    const [rows] = await pool.execute(
      `SELECT 
        fp.price_lkr as base_price,
        c.price_increment,
        (fp.price_lkr + c.price_increment) as final_price,
        s.display as size_display,
        ft.name as frame_name,
        c.name as category_name
      FROM frame_prices fp
      JOIN frame_types ft ON fp.frame_type_id = ft.id
      JOIN categories c ON ft.category_id = c.id
      JOIN sizes s ON fp.size_id = s.id
      WHERE fp.frame_type_id = ? AND fp.size_id = ?`,
      [frameTypeId, sizeId]
    );
    
    if (rows.length === 0) {
      console.log('❌ Price not found for frame:', frameTypeId, 'size:', sizeId);
      return res.status(404).json({
        success: false,
        message: 'Price not found for this combination'
      });
    }
    
    console.log('✅ Price fetched:', rows[0]);
    
    res.json({
      success: true,
      data: {
        base_price: parseFloat(rows[0].base_price),
        price_increment: parseFloat(rows[0].price_increment),
        final_price: parseFloat(rows[0].final_price),
        size_display: rows[0].size_display,
        frame_name: rows[0].frame_name,
        category_name: rows[0].category_name
      }
    });
  } catch (error) {
    console.error('❌ Error fetching price:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch price',
      error: error.message
    });
  }
};
