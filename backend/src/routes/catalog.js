import express from 'express';
import {
  getAllCategories,
  getDesignSamples,
  getFrameTypes,
  getSizes,
  getFrameColors,
  getAllCustomers
} from '../controllers/catalogController.js';

const router = express.Router();

// Catalog routes
router.get('/categories', getAllCategories);
router.get('/design-samples/:categoryId', getDesignSamples);
router.get('/frame-types/:categoryId', getFrameTypes);
router.get('/sizes/:frameTypeId', getSizes);
router.get('/frame-colors/:frameTypeId', getFrameColors);
router.get('/customers', getAllCustomers);

export default router;
