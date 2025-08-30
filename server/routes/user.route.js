// routes/user.route.js
const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { validateBody } = require("../middleware/validateObjectId");
const { verifyToken, checkRole, authUser } = require("../middleware/auth");
const { upload } = require("../utils/upload");

const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
} = require("../validations/user.validation");

router.post("/register", validateBody(registerSchema), userController.register);
// Gửi OTP qua email
router.post("/send-otp", userController.sendOTP);
// Xác minh OTP
router.post("/verify-otp", userController.verifyOTP);

router.post("/login", validateBody(loginSchema), userController.login);

//admin login
router.post(
  "/loginAdmin",
  validateBody(loginSchema),
  userController.loginAdmin
);

router.post(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  userController.forgotPassword
);
router.post(
  "/reset-password",
  validateBody(resetPasswordSchema),
  userController.resetPassword
);

router.post(
  "/profile/change-password",
  authUser,
  // validateBody(changePasswordSchema),
  userController.changePassword
);

// user get they info
router.get("/profile", authUser, userController.getMyProfile);

// update profile user
router.put(
  "/profile",
  authUser,
  // validateBody(updateProfileSchema),
  userController.updateProfile
);

// Admin routes
router.use(verifyToken, checkRole("admin"));

router.get("/", checkRole("admin"), userController.getAllUsers);
router.get("/:id", checkRole("admin"), userController.getUserById);
router.delete("/:id", checkRole("admin"), userController.deleteUser);
router.put(
  "/:id",
  checkRole("admin"),
  validateBody(updateProfileSchema),
  userController.updateUser
);
module.exports = router;
