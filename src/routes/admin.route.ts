import { Router } from "express";
import { signIn } from "../controllers/Signin_SignUp/admin.signin";
import { signUp } from "../controllers/Signin_SignUp/admin.signup";
import { verify_token } from "../middlewares/jwtverify";
import {
  addCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/Category/admin.categoryCrud";
import { getAllUsers } from "../controllers/Users/admin.getAllUsers";
import { getUser } from "../controllers/Users/admin.getUser";
import { blockUnblockUser } from "../controllers/Users/admin.blockUnblockUser";
import { getAllProducts } from "../controllers/Product/admin.getAllProducts";
import { getProduct } from "../controllers/Product/admin.getProduct";
import { blockUnblockProduct } from "../controllers/Product/admin.blockUnblockProduct";
import { getBundleProducts } from "../controllers/Bundle Product/seller.getBundleProducts";
import { getBundleProduct } from "../controllers/Bundle Product/seller.getBundleProduct";
import { addBundleProduct } from "../controllers/Bundle Product/admin.addBundleProduct";
import { blockUnblockBundleProduct } from "../controllers/Bundle Product/admin.blockUnblockBundleProduct";
import { deleteBundleProduct } from "../controllers/Bundle Product/seller.deleteBundleProduct";
import { addDiscount } from "../controllers/Discount/admin.addDiscount";
import { getDiscount } from "../controllers/Discount/admin.getDiscount";
import { addProduct } from "../controllers/Product/admin.addProduct";
import { getProductsByCategory } from "../controllers/Product/admin.getProductsByCategory";
import { getLoginStatistics } from "../controllers/Users/admin.getLoginStatistic";
import { deleteDiscount } from "../controllers/Discount/admin.deleteDiscount";
import { addDiscountOnBundle } from "../controllers/Discount/admin.addDiscountOnBundle";
import { deleteDiscountOnBundle } from "../controllers/Discount/seller.deleteDiscountBundle";

// import { getlogin } from "../controllers/Users/admin.getUserlogin";
const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

// Secured Routes
router.post("/addCategory", verify_token, addCategory);
router.get("/getAllCategory", verify_token, getAllCategory);
router.get("/getCategory/:id", verify_token, getCategory);
router.patch("/updateCategory/:id", verify_token, updateCategory);
router.delete("/deleteCategory/:id", verify_token, deleteCategory);

// user related routes--
router.get("/getAllUsers", verify_token, getAllUsers);
router.get("/getUser/:id", verify_token, getUser);
router.patch("/blockUnblockUser/:id", verify_token, blockUnblockUser);

// // Product and Bundle Product Related routes--
router.get("/getAllProducts", verify_token, getAllProducts);
router.get("/getProduct/:id", verify_token, getProduct);
router.post("/addProduct", verify_token, addProduct);
router.get("/getProductsByCategory", verify_token, getProductsByCategory);
router.patch("/blockUnblockProduct/:id", verify_token, blockUnblockProduct);

router.post("/addBundleProduct", verify_token, addBundleProduct);
router.get("/getAllBundleProducts", verify_token, getBundleProducts);
router.get("/getBundleProduct/:id", verify_token, getBundleProduct);
router.delete("/deleteBundleProduct/:id", verify_token, deleteBundleProduct);
router.patch(
  "/blockUnblockBundleProduct/:id",
  verify_token,
  blockUnblockBundleProduct
);

// Discount related routes
router.post("/addDiscount/:id", verify_token, addDiscount);
router.get("/getDiscount/:id", verify_token, getDiscount);
router.delete("/deleteDiscount/:id", verify_token, deleteDiscount);
router.post("/addDiscountOnBundle/:id", verify_token, addDiscountOnBundle);
router.delete(
  "/deleteDiscountOnBundle/:id",
  verify_token,
  deleteDiscountOnBundle
);
// user login details daily, monthly, weekly, yearly
router.get("/login-report", getLoginStatistics);

export default router;
