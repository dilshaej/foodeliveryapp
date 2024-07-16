const express = require('express')
const userController = require('../Controllers/userController')
const foodController = require('../Controllers/foodController')
const jwtMiddleware = require('../Middlewares/jwtMiddlewares')
const multerConfig = require('../Middlewares/multerMiddlewares')
const { addToCart, removeFromCart, getCart } = require('../Controllers/cartController')
const { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } = require('../Controllers/orderController')
const router = new express.Router()
 

// register
router.post('/register', userController.register)
// login
router.post('/login', userController.login)

router.post('/add', jwtMiddleware, multerConfig.single('image'), foodController.addFood)
router.get('/list', jwtMiddleware, foodController.listFood)
router.delete('/remove/:pid', jwtMiddleware, foodController.removeFood)

router.post('/addcart', jwtMiddleware, addToCart)
router.post('/removecart', jwtMiddleware, removeFromCart)
router.post('/getcart', jwtMiddleware, getCart)

router.post('/place', jwtMiddleware, placeOrder)

router.post('/verify',verifyOrder)
router.post('/userorders',jwtMiddleware,userOrders)
router.get('/listorders', listOrders)

router.post('/status', updateStatus)




module.exports = router
