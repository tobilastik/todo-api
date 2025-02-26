
import  {Router} from 'express'
import { createProduct, deleteProduct, getProductById, listProduct, updateProduct } from './productController'
import { validateData } from '../../middleware/validationMiddleware'
import { createProductSchema, updateProductSchema } from '../../db/productSchema';
import { verifySeller, verifyToken } from '../../middleware/authMiddleware';


const router = Router()

router.get('/', listProduct)
router.get('/:id', getProductById)
router.post('/', verifyToken, verifySeller, validateData(createProductSchema), createProduct)
router.put('/:id', verifyToken, verifySeller, validateData(updateProductSchema), updateProduct)
router.delete('/:id', verifyToken, verifySeller, deleteProduct)


export default router