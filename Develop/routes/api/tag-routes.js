const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id` be sure to include its associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        },
      ],
    });
    // If no tag found, return 404 status code
    if (!tagData) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(201).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If no tag found, return 404 status code
    if (updatedTagData[0] === 0) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    res.json(updatedTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value

  try {
    const deletedTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no tag found, return 404 status code
    if (!deletedTagData) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.json(deletedTagData);
  } catch (err) {
    res.status(500).json(error);
  }
});

module.exports = router;
