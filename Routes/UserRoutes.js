const userRouter = require('express').Router();
const usercontroller = require('../controllers/user');
const traincontroller = require('../controllers/train');
const authmiddleware = require('../middleware/authmidleware');


userRouter.post('/signup', usercontroller.signup);
userRouter.post('/signin', usercontroller.signin);
userRouter.post('/forgot', usercontroller.forgot);
userRouter.post('/reset', usercontroller.reset);

userRouter.get('/list', authmiddleware.verifyToken, traincontroller.list);
userRouter.get('/data', authmiddleware.verifyToken, traincontroller.graph);
userRouter.post('/trainlist', authmiddleware.verifyToken, traincontroller.trainList);
userRouter.post('/create', authmiddleware.verifyToken, traincontroller.createtrain);
userRouter.post('/booking', authmiddleware.verifyToken, traincontroller.booking);
userRouter.post('/payment', authmiddleware.verifyToken, traincontroller.payment);
userRouter.post('/receipt', authmiddleware.verifyToken, traincontroller.receipt);
userRouter.get('/bookingDetails', authmiddleware.verifyToken, traincontroller.bookinglist);

module.exports = userRouter;
