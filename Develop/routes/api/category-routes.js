const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [Product],
    });
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const categoryData = await Category.findbyPK(req.params.id, {
      include: [Product],
    });

    // If no category found, return 404 status code
    if (!categoryData) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // If no category found, return 404 status code
    if (categoryData[0] === 0) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // If no category found, return 404 status code
    if (!categoryData) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json(categoryData);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
