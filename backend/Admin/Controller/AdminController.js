const asyncHandler = require("express-async-handler");
const Adminn = require("../Model/AdminSchema");
const Product = require("../../Product/ProductSchema");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const fs = require("fs");

//
const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("please add all fields");
  }
  const AdminExists = await Adminn.findOne({ email });
  if (AdminExists) {
    return res.status(409).send("Email Already Exist. Please Login");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const Admin = await Adminn.create({
    email,
    password: hashedPassword,
  });

  if (Admin) {
    res.status(200).json({
      _id: Admin.id,
      token: generateToken(Admin.id),
      message: "Account created succefully",
    });
  } else {
    res.status(401).json({
      message: "Account not created",
    });
    throw new Error("Invalid client data");
  }
});

//
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const client = await Adminn.findOne({ email });
  console.log(client);
  if (client && (await bcrypt.compare(password, client.password))) {
    res.json({
      _id: client.id,
      token: generateToken(client.id),
      message: "Admin loged succes",
    });
  } else {
    res.status(400).json({
      message: "invalid client Data",
    });
  }
});

//
const AddProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category } = req.body;
  console.log(req.body)
  if (!name || !description || !price || !category) {
    res.status(400).send("please add all fields");
  }
  const ProductExists = await Product.findOne({ name });
  if (ProductExists) {
    return res.status(409).send("Product Already Exist. Please Login");
  }

  const product = await Product.create({
    name,
    description,
    price,
    testImage: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
    category,
  });

  if (product) {
    res.status(200).json(
      product
  
    );
  } else {
    res.status(401).json({
      message: "Account not created",
    });
    throw new Error("Invalid client data");
  }
});

const UpdateProduct = asyncHandler(async (req, res) => {
  const productId = req.params._id;
  const { name, description, price, category } = req.body;


  const updatedFields = {};



  if (name) updatedFields.name = name;
  if (description) updatedFields.description = description;
  if (price) updatedFields.price = price;
  if (category) updatedFields.category = category;
  if (req.file) {
    updatedFields.testImage = {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype,
    };
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updatedFields,
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
});



//
const getAllProduct = asyncHandler(async (req, res) => {
  const findProduct = await Product.find();
  res.status(200).json(findProduct);
});

const getProductById = async (req, res) => {
  try {
    const findProductById = await Product.findById(req.params._id);
    res.status(200).json(findProductById);
    console.log(findProductById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//@desc DELETE Car
//@route /api/v1/cars/:car_id
//@access private
const deleteProduct = asyncHandler(async (req, res) => {
  const productDeleted = await Product.findById(req.params._id);
  productDeleted.remove();
  res.status(200).json({
    message: "Product deleted successfully",
  });
});

module.exports = {
  registerAdmin,
  loginAdmin,
  AddProduct,
  UpdateProduct,
  getAllProduct,
  deleteProduct,
  getProductById
};
