import { Category } from "../models/category.js";

// post categories
export const postCategory = async (req, res) => {
  try {
    const category = await Category.Create({
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon,
      image: req.body.image,
    });

    res.status(200).send(category);
  } catch (error) {
    res.status(400).send(err);
  }
};
