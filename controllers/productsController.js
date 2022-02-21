import { Product } from "../models/product.js";
import { Image } from "../models/image.js";

// get products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    res.status(404).send(error);
  }
};

// get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!product) return res.status(404).send("This product does not exist.");

    res.send(product);
  } catch (error) {
    res.status(400).send(err);
  }
};

// create product
export const createProduct = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send("No image in the request");

    const fileName = req.file.filename;
    const filePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      price: req.body.price,
      image: `${filePath}${fileName}`,
      brand: req.body.brand,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
      category: req.body.category,
    });

    if (!product) return res.status(404).send("Product not found");

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(err);
  }
};

// delete products
export const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: { id: parseInt(req.params.id) },
    });

    res.send("Successfully deleted product");
  } catch (error) {
    res.status(400).send(error);
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: parseInt(req.params.id) },
    });

    if (!product) return res.status(400).send("This product does not exist.");

    const file = req.file;
    let imagePath;

    if (file) {
      const fileName = req.file.filename;
      const filePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
      imagePath = `${filePath}${fileName}`;
    } else {
      imagePath = product.image;
    }

    const updatedProduct = await Product.update(
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        price: req.body.price,
        image: imagePath,
        brand: req.body.brand,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        category: req.body.category,
      },
      {
        where: { id: parseInt(req.params.id) },
      }
    );

    if (!updatedProduct)
      return res.status(500).send("failed to update product");

    res.send(updatedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

// multiple images
export const insertGalleryImages = async (req, res) => {
  try {
  } catch (error) {}
};

//product count
export const productCount = async (req, res) => {
  try {
    const productCount = await Product.count({ col: "Product.id" });

    if (!productCount) return res.status(500).send({ success: true });

    return res.status(200).send({ productCount: productCount });
  } catch (error) {
    res.status(500).send(error);
  }
};
