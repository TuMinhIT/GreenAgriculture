// routes/user.route.js
const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { validateBody } = require('../middleware/validateObjectId');
const { verifyToken, checkRole } = require('../middleware/auth');

const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
} = require('../validations/user.validation');

// Public routes
router.post('/register', validateBody(registerSchema), userController.register);
router.post('/login', validateBody(loginSchema), userController.login);
router.post('/forgot-password', validateBody(forgotPasswordSchema), userController.forgotPassword);
router.post('/reset-password', validateBody(resetPasswordSchema), userController.resetPassword);

// Gửi OTP qua email
router.post("/send-otp", userController.sendOTP);

// Xác minh OTP
router.post("/verify-otp", userController.verifyOTP);

// Protected routes
router.get('/me', verifyToken, userController.getMyProfile);

router.put('/me', verifyToken, validateBody(updateProfileSchema), userController.updateProfile);

router.put('/change-password', verifyToken, validateBody(changePasswordSchema), userController.changePassword);

// Admin routes
router.use(verifyToken, checkRole('admin'));
router.get('/', checkRole('admin'), userController.getAllUsers);
router.get('/:id', checkRole('admin'), userController.getUserById);
router.put('/:id', checkRole('admin'), validateBody(updateProfileSchema), userController.updateUser);
router.delete('/:id', checkRole('admin'), userController.deleteUser);

module.exports = router;