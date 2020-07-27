const router = require("express").Router();

const Tags = require("./models/tags-model");
const Trunc = require("./models/trunc-model");

/* Endpoints:
    GET /trunc            gets all trunc recipes for user
    GET /userTags         gets all tags for user
    GET /StandardTags     gets non-custom tags
    DEL /userTags/:tagId  deletes tag by ID

*/

router.get("/trunc", async (req, res) => {
  const userId = req.session.userId;
  console.log("GET TRUNC");
  let truncatedRecipes = null;
  try {
    truncatedRecipes = await Trunc.getByUser(userId);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ message: "An error occurred while trying to retrieve recipe" });
  }
  console.log('truncatedRecipes in get trunc', truncatedRecipes)
  if (truncatedRecipes) {
    res.status(200).json({ truncatedRecipes });
  } else {
    res.status(400).json({ message: "Recipes not Found" });
  }
});

router.get("/userTags", async (req, res) => {
  console.log("USER TAGS req.session", req.session);
  const userId = req.session.userId;
  let userTags = null;
  try {
    userTags = await Tags.getUser(userId);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "An error occurred while trying to retrieve user tags",
    });
  }
  if (userTags) {
    res.status(200).json({ userTags });
  } else {
    res.status(400).json({ message: "Tags not found" });
  }
});

router.delete("/userTags/:tagId", async (req, res) => {
  const tagId = req.params.tagId;
  const response = await Tags.delTag(tagId);
});

router.get("/standardTags", async (req, res) => {
  try {
    const standardTags = await Tags.getStandard();
    res.status(200).json({ standardTags });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "An error occurred while trying to retrieve standard tags",
    });
  }
});

module.exports = router;