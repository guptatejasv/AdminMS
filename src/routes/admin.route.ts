import { Router } from "express";
import { signIn } from "../controllers/admin.signin";
import { signUp } from "../controllers/admin.signup";
import { verify_token } from "../middlewares/jwtverify";
import { getAllProducts } from "../controllers/admin.getAllProducts";
import { getProduct } from "../controllers/admin.getProduct";
import { blockUnblockProduct } from "../controllers/admin.blockUnblockProduct";
import { blockUnblockBundleProduct } from "../controllers/admin.blockUnblockBundleProduct";
import { getAllBundleProducts } from "../controllers/admin.getAllBundleProducts";
import { getBundleProduct } from "../controllers/admin.getBundleProduct";
import {
  addCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/admin.categoryCrud";

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
// router.get('/getAllUsers',verify_token, getAllUsers);
// router.get('/getUser/:id', verify_token, getUser);
// router.patch('/blockUnblockUser/:id', verify_token, blockUnblockUser);

// Product and Bundle Product Related routes--
router.get("/getAllProducts", verify_token, getAllProducts);
router.get("/getProduct/:id", verify_token, getProduct);
router.patch("/blockUnblockProduct/:id", verify_token, blockUnblockProduct);

router.get("/getAllBundleProducts", verify_token, getAllBundleProducts);
router.get("/getBundleProduct/:id", verify_token, getBundleProduct);
router.patch(
  "/blockUnblockBundleProduct/:id",
  verify_token,
  blockUnblockBundleProduct
);

export default router;
