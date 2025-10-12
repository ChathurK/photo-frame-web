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
