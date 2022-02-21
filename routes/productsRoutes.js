import express from "express";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  insertGalleryImages,
} from "../controllers/productsController.js";
import multer from "multer";

const router = express.Router();

//image file extensions
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

// image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");

    if (isValid) uploadError = null;

    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

// get all products
router.get("", getAllProducts);

// get product by id
router.get("/:id", getProductById);

//create product
router.post("/", uploadOptions.single("image"), createProduct);

//delete product
router.delete("/:id", deleteProduct);

//update product
router.put("/:id", updateProduct);

// multple image insert
router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 10),
  insertGalleryImages
);

export default router;
