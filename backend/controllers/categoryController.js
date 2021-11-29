const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    if (req.body.name == null) {
      return res.json({
        status: false,
        status_code: 400,
        message: "name field required",
        // redirect: "/user"
      });
    }
    const { name } = req.body;
    const category = await new Category({
      name,
      slug: slugify(name).toLowerCase(),
    }).save();

    return res.json({
      status: true,
      status_code: 200,
      message: "created successfully",
      data: category,
      // redirect: "/user"
    });
  } catch (err) {
    console.log(err);
    if (err.errors !== undefined) {
      var error = err.errors.name.message;
      return res.json({
        status: false,
        status_code: 400,
        message: error,
        // redirect: "/user"
      });
    } else {
      return res.json({
        status: false,
        status_code: 400,
        message: err.message,
        // redirect: "/user"
      });
    }
  }
};

exports.list = async (req, res) => {
  var categories = await Category.find({}).sort({ createdAt: -1 }).exec();
  return res.json({
    status: true,
    status_code: 200,
    data: categories,
    message: "Data Fetched Successfully",
    // redirect: "/user"
  });
};

exports.read = async (req, res) => {
  if (req.params.slug == null) {
    return res.status(400).send({
      message: "category required",
    });
  }
  var category = await Category.findOne({ slug: req.params.slug }).exec();
  return res.json(category);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name == null) {
      return res.status(400).send("name field required");
    }

    if (req.params.slug == null) {
      return res.status(400).send("slug param required");
    }

    var category = await Category.findOne({ slug: req.params.slug }).exec();
    if (category == null) {
      return res.status(400).send("no such filed in database");
    }
    //findOneAndUpdate({update on base of slug},{passed update chages required})

    const updated = await Category.updateOne(
      { slug: req.params.slug },
      { name: req.body.name, slug: slugify(req.body.name).toLowerCase() },
      { new: true }
    );

    return res.status(200).send("updated successfully");
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    if (req.params.slug == null) {
      return res.status(400).send({
        message: "category required",
      });
    }

    const deleted = await Category.remove({ slug: req.params.slug });
    return res.status(200).send({
      message: "category Deleted Succesfully",
    });
  } catch (err) {
    return res.status(400).send({
      message: err,
    });
  }
};
