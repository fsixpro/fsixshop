import express from 'express'
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsAdmin,
  updateProduct,
} from '../controllers/productController.js'
import { auth, admin } from '../middleware/auth.js'
const router = express.Router()

router.route('/').get(getProducts).post(auth, admin, createProduct)
router.route('/admin').get(getProductsAdmin)
router.post('/:id/review', auth, createProductReview)
router
  .route('/:id')
  .get(getProductById)
  .delete(deleteProduct)
  .put(auth, admin, updateProduct)

export default router
